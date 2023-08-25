const handleAddTodo = (req, res) => {
  const { todosController } = req.app;
  const resposneHandlers = {
    onSuccess: () => res.status(201).end(),
    onError: () => res.status(500).end(),
  };

  if (!req.body.title) {
    resposneHandlers.onError();
    return;
  }
  todosController.addTodo(req.body.title, resposneHandlers);
};

module.exports = { handleAddTodo };
