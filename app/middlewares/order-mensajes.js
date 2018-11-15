module.exports = (request, response, next) => {
  //var d = new Date();
  //var n = d.toISOString();
  let orderSring = request.query.order;
  console.log(orderSring);
  if (orderSring==undefined){
    orderSring = "";
  }
  console.log(orderSring);
  let orderArray = orderSring.split(",").map(function (val) { return val.trim(); });
  console.log(orderArray);
  let order = orderArray.reduce(
    function(order, field){
      if (field.charAt(0)=='-'){
        order[field.substring(1)] = -1;
      } else {
        order[field] = 1;
      }
      return order;
  }, {});
  console.log(order);
  let fecha = order.fecha;
  if ( isNaN(fecha) ) {
    fecha = -1;
  }
  console.log(fecha);
  response.locals.order = { fecha };
  next();
};
