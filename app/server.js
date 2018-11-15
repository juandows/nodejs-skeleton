'use strict';

const argv = require('yargs')
  .option('p', { alias: 'port', number: true, required: true, describe: 'server port to listen to' })
  .option('f', { alias: 'config', string: true, required: true, describe: 'configuration file as per schemas/api-config.json' })
  .usage('Usage: node $0 -f <config file>')
  .argv;

const loadApiConfig = require('./helpers/load-api-config');
const Database = require('./helpers/mongodb-database');
const express = require('express');

// Constants
const PORT = argv.port;
const HOST = '0.0.0.0';

let config;
try {
  config = loadApiConfig(argv.config); //('configs/localhost.api-config.json');
} catch (error) {
  //logger.error(`config file ${argv.config}: ${error.message}`);
  console.log(`config file ${argv.config}: ${error.message}`);
  process.exit();
}


// App
const app = express();
app.locals.database = new Database(config.mongodb);

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// Extend the response object
app.use(require('./middlewares/extend-response'));
const errors = require('./helpers/errors');
const errorHandler = require('./middlewares/error-handler');

app.get('/', (req, res) => {
  res.send('Ok :)\n');
});

const server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
app.locals.database.getBuzonesStats().then(function (res){
  console.log("Mensajes:", res.count);
});
/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://192.168.30.133:27017/buzones';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});*/

// Routes
app.use('/api', require('./routes/api'));

process.on("SIGINT", function() {
   server.close( err =>  {
     process.exit(err ? 1 : 0);
   });
});
