const http = require("http");

const handle = (request, response) => {
  console.log(request.url);
};

const main = () => {
  const port = 8000;
  const server = http.createServer(handle);

  server.listen(port, () => console.log("Listening on", port));
};

main();
