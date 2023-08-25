const logRequest = (request, _, next) => {
  console.log(request.method, request.url);
  next();
};

module.exports = { logRequest };
