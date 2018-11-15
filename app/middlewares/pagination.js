module.exports = (request, response, next) => {
  let skip = parseInt(request.query.skip);
  if (isNaN(skip) || skip < 0) {
    skip = 0;
  }
  let limit = parseInt(request.query.limit);
  if (isNaN(limit) || limit < 1) {
    limit = 1000000;
  }
  response.locals.pagination = { skip, limit };
  next();
};
