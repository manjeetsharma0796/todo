const handleRestore = (req, res) => {
  const { todoController } = req.app;
  const todoDetails = todoController.getDetails();
  res.json(todoDetails);
};

module.exports = { handleRestore };
