const MongoDB = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const dateUtils = require('./date-utils');
const errors = require('./errors');

class Database {

  constructor({ username, password, hosts, database, replicaSet, ssl, sslCert, sslKey, sslCA, options }) {
    const auth = (username && password) ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}@` : '';
    const _options = (options) ? `?${options}`: '';
    const url = `mongodb://${auth}${hosts.join(',')}/${database}${_options}`;
    this.connect = MongoDB.MongoClient.connect(url, { w: 'majority', j: true, ssl, sslCert, sslKey, sslCA, replicaSet });
  }

  // MongoDB's insertOne returns a complex object. Use this to return the actual result or throw an error
  static processInsertOneResult(result) {
    if (result.ops.length === 0) {
      throw errors.cannotCreateObject;
    } else {
      const created = Object.assign({}, result.ops[0]);
      //delete created._id;
      return { created };
    }
  }

  // Use this when insertOne throws to detect if the error is that the object already exists
  static processInsertOneError(error) {
    if (error.code === 11000) {
      throw errors.cannotCreateObjectAlreadyExists;
    } else {
      throw error;
    }
  }

  static processUpsertOneResult(result) {
    return result;
  }

  static processUpsertOneError(result) {
    return result;
  }

  // MongoDB's insertMany returns a complex object. Use this to return the actual result or throw an error
  static processInsertManyResult(result) {
    if (result.ops.length === 0) {
      throw errors.cannotCreateObject;
    } else {
      delete result.ops;
      return result;
    }
  }

  // Use this when insertMany throws an error
  static processInsertManyError(error) {
    throw error;
  }

  // MongoDB's findOneAndUpdate returns a complex object. Use this to return the actual result
  static processFindOneAndUpdateResult(result) {
    if (result.lastErrorObject.n === 1 && result.value !== null) {
      return { updated: result.value };
    }
    throw errors.cannotUpdateObjectNotFound;
  }

  // Use this when findOneAndUpdate throws to detect if the error is that there is a duplicate key
  static processFindOneAndUpdateError(error) {
    if (error.code === 11000) {
      throw errors.cannotUpdateObjectDuplicateValue;
    } else {
      throw error;
    }
  }

  // MongoDB's findOneAndDelete returns a complex object. Use this to return the actual result
  static processFindOneAndDeleteResult(result) {
    if (result.lastErrorObject.n === 1 && result.value !== null) {
      return { deleted: result.value };
    }
    throw errors.cannotDeleteObjectNotFound;
  }

  getBuzonesStats() {
    return this.connect.then(db => db.collection('mensajes').stats());
  }

  insertOneMensaje(mensaje) {
    return this.connect.then(db => db.collection('mensajes').insertOne(mensaje)
      .then(Database.processInsertOneResult, Database.processInsertOneError));
  }

  //leido y/o borrado
  updateMensaje({application, box, id, update}) {
    const query = {};
    query.application = application;
    query.box = box;
    query._id = new ObjectId(id);
    const options = {};
    return this.connect.then(db => db.collection('mensajes').findOneAndUpdate(query, { $set: update }, options)
      .then(Database.processFindOneAndUpdateResultOneResult, Database.processFindOneAndUpdateError));
  }

  //leido y/o borrado
  deleteMensaje({application, box, id}) {
    const query = {};
    query.application = application;
    query.box = box;
    query._id = new ObjectId(id);
    const options = {};
    return this.connect.then(db => db.collection('mensajes').remove(query, { justOne: true })
      .then(Database.processFindOneAndUpdateResultOneResult, Database.processFindOneAndUpdateError));
  }

  getMensaje({application, box, id}) {
    const query = {};
    query.application = application;
    query.box = box;
    query._id = new ObjectId(id);
    return this.connect.then((db) => {
      const mensajes = db.collection('mensajes');
      return mensajes.findOne(query);
    });
  }

  getMensajes({ pagination, filter, order, application, box }) {
    const { skip, limit } = pagination;
    const query = {};
    query.application = application;
    query.box = box;
    if (filter.fecha !== undefined) {
      //const max = dateUtils.stringToDate(filter.fecha.max);
      //query.$and = [{ fecha: { $gte: min } }, { fecha: { $lte: max } }];
      query.fecha = { $gte: filter.fecha };
    }
    if (filter.borrado !== undefined) {
      query.borrado = filter.borrado;
    }
    if (filter.leido !== undefined) {
      query.leido = filter.leido;
    }
    return this.connect.then((db) => {
      const mensajes = db.collection('mensajes');
      return Promise.all([
        mensajes.count(query),
        mensajes.find(query).sort({fecha: order.fecha}).skip(skip).limit(limit).toArray(),
      ]).then(([total, results]) => ({total, mensajes: results, skip, limit: results.length}));
    });
  }

  getAplicaciones({ pagination }) {
    const { skip, limit } = pagination;
    return this.connect.then((db) => {
      const mensajes = db.collection('mensajes');
      return Promise.all([
        mensajes.aggregate([
          { $group: { _id : "$application" }, },
          { $group: {
            _id : null,
            total : {$sum : 1}
          } }
        ]).toArray(),
        mensajes.aggregate([
          { $group: { _id : "$application", mensajes:{$sum: 1} }, },
        ]).skip(skip).limit(limit).toArray(),
      ]).then(([total, results]) => ({total: (total[0])?total[0].total:0, aplicaciones: results, skip, limit: results.length}));
    });
  }

  getBuzones({ pagination, application }) {
    const { skip, limit } = pagination;
    return this.connect.then((db) => {
      const mensajes = db.collection('mensajes');
      return Promise.all([
        mensajes.aggregate([
          { $match: { application: application} },
          { $group: { _id : "$box" }, },
          { $group: {
            _id : null,
            total : {$sum : 1}
          }  }
        ]).toArray(),
        mensajes.aggregate([
          { $match: { application: application} },
          { $group: { _id : "$box", mensajes:{$sum: 1} }, },
        ]).skip(skip).limit(limit).toArray(),
      ]).then(([total, results]) => ({total: (total[0])?total[0].total:0, aplicaciones: results, skip, limit: results.length}));
    });
  }

  getGrupos({ pagination }) {
    const { skip, limit } = pagination;
    const query = {};
    return this.connect.then((db) => {
      const grupos = db.collection('grupos');
      return Promise.all([
        grupos.count(query),
        grupos.find(query).sort({nombre: 1}).skip(skip).limit(limit).toArray(),
      ]).then(([total, results]) => ({total, grupos: results, skip, limit: results.length}));
    });
  }

  getGruposAplicacion({ pagination, application }) {
    const { skip, limit } = pagination;
    const query = {};
    query.aplicacion = application;
    console.log(query);
    return this.connect.then((db) => {
      const grupos = db.collection('grupos');
      return Promise.all([
        grupos.count(query),
        grupos.find(query).sort({nombre: 1}).skip(skip).limit(limit).toArray(),
      ]).then(([total, results]) => ({total, grupos: results, skip, limit: results.length}));
    });
  }

  getGrupo({id}) {
    const query = {};
    query._id = new ObjectId(id);
    return this.connect.then((db) => {
      const grupos = db.collection('grupos');
      return grupos.findOne(query);
    });
  }

  getGrupoByName({app, gname}) {
    const query = {};
    query.aplicacion = app;
    query.nombre = gname;
    return this.connect.then((db) => {
      const grupos = db.collection('grupos');
      return grupos.findOne(query);
    });
  }

  //db.grupos.distinct("usuarios",{aplicacion:"iris2"})
  getUsuariosGruposAplicacion({ application }) {
    const query = {};
    query.aplicacion = application;
    console.log(query);
    return this.connect.then((db) => {
      const grupos = db.collection('grupos');
      return grupos.distinct("usuarios",query).then(result => {
        return result;
      })
    });
  }

  updateGrupo({id, update}) {
    const query = {};
    query._id = new ObjectId(id);
    const options = {};
    return this.connect.then(db => db.collection('grupos').findOneAndUpdate(query, { $set: update }, options)
      .then(Database.processFindOneAndUpdateResultOneResult, Database.processFindOneAndUpdateError));
  }

  deleteGrupo({id}) {
    const query = {};
    query._id = new ObjectId(id);
    const options = {};
    return this.connect.then(db => db.collection('grupos').deleteOne(query)
      .then(Database.processFindOneAndUpdateResultOneResult, Database.processFindOneAndUpdateError));
  }

  insertOneGrupo(grupo) {
    return this.connect.then(db => db.collection('grupos').insertOne(grupo)
      .then(Database.processInsertOneResult, Database.processInsertOneError));
  }

}



module.exports = Database;
