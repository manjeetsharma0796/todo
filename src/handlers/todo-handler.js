const handleAddTodo = (req, res) => {
  const { todoController } = req.app;
  const resposneHandlers = {
    onSuccess: () => res.status(201).end(),
    onError: () => onError(req, res),
  };

  todoController.addTodo(req.body.title, resposneHandlers);
};

module.exports = { handleAddTodo };
