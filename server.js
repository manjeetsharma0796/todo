const http = require("http");
const { handleRoute } = require("./src/handle-route");

const main = () => {
  const port = 8000;
  const server = http.createServer(handleRoute);

  server.listen(port, () => console.log("Listening on", port));
};

main();
