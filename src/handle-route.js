const { handleFileRequest } = require("./handlers");

const handleRoute = (request, response) => {
  handleFileRequest(request, response);
};

module.exports = { handleRoute };
