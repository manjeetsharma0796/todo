const { handleHome, handleFileRequest } = require("./handlers");

const handleRoute = (request, response) => {
  console.log(request.url);

  const { url, method } = request;
  const routes = {
    GET: {
      "/": handleHome,
    },
  };

  if (url in routes[method]) {
    routes[method][url](request, response);
    return;
  }

  handleFileRequest(request, response);
};

module.exports = { handleRoute };
