const handleRestore = (req, res) => {
  const { todosController } = req.app;
  const todoDetails = todosController.getDetails();

  res.json(todoDetails);
};

module.exports = { handleRestore };
