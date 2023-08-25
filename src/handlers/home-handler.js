const ROOT = "/Users/manjeet/workspace/html/assignment/todo-manjeetsharma0796";

const serveHomePage = (_, res) => {
  const filePath = `${ROOT}/public/index.html`;
  res.sendFile(filePath);
};

module.exports = { serveHomePage };
