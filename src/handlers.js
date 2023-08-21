const fs = require("fs");

const getMimeType = (extension) => {
  const mime = {
    "ico": "image/vnd.microsoft.icon",
    "html": "text/html",
    "css": "text/css",
    "txt": "text/plain",
    "js": "text/javascript",
    "/": "text/html",
  };

  return mime[extension];
};

const handleNotFound = (path, response) => {
  const content = `${path} not found`;
  const type = "text/plain";

  response.statusCode = 404;
  response.setHeader("Content-Type", type);
  response.end(content);
};

const render = (request, response, content) => {
  const [extension] = request.url.split(".").slice(-1);
  const type = getMimeType(extension);

  response.writeHead(200, {
    "Content-type": type,
  });
  response.end(content);
};

const readFile = (path, request, response, onData) => {
  fs.readFile(path, (err, content) => {
    if (err) {
      handleNotFound(path, response);
      return;
    }

    onData(request, response, content);
  });
};

const handleHome = (request, response) => {
  const path = "index.html";
  readFile(path, request, response, render);
};

const handleFileRequest = (request, response) => {
  const path = request.url.replace("/", "");
  readFile(path, request, response, render);
};

module.exports = {
  handleHome,
  handleFileRequest,
};
