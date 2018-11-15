module.exports = (request, response, next) => {
  //var d = new Date();
  //var n = d.toISOString();
  let fecha = new Date(request.query.fecha);
  if ( isNaN(fecha.getTime()) ) {
    fecha = undefined;
  }
  let borrado = (request.query.borrado === "true");
  if ( !(request.query.borrado === "true") && !(request.query.borrado === "false") ){
    borrado = undefined;
  }
  let leido = (request.query.leido === "true");
  if ( !(request.query.leido === "true") && !(request.query.leido === "false") ){
    leido = undefined;
  }
  response.locals.filter = { fecha, borrado, leido };
  next();
};
