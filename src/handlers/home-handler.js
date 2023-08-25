const ROOT_DIR = process.env.PWD;

const serveHomePage = (_, res) => {
  const filePath = `${ROOT_DIR}/public/index.html`;
  res.sendFile(filePath);
};

module.exports = { serveHomePage };
