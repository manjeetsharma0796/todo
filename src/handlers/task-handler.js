const handleAddTask = (req, res) => {
  const { todosController } = req.app;
  const responseHandlers = {
    onSuccess: () => res.status(201).end(),
    onError: () => res.status(500).end(),
  };

  todosController.addTask(
    req.body.description,
    parseInt(req.params.todoID),
    false,
    responseHandlers
  );
};

const handleDeleteTask = (req, res) => {
  const { todosController } = req.app;
  const { todoID, taskID } = req.params;
  const responseHandlers = {
    onSuccess: () => res.status(204).end(),
    onError: () => res.status(500).end(),
  };

  todosController.deleteTask(
    parseInt(taskID),
    parseInt(todoID),
    responseHandlers
  );
};

const handleToggleTask = (req, res) => {
  const { todosController } = req.app;
  const { todoID, taskID } = req.params;
  const responseHandlers = {
    onSuccess: () => res.status(204).end(),
    onError: () => res.status(500).end(),
  };

  todosController.patchTaskStatus(
    parseInt(taskID),
    parseInt(todoID),
    req.body.isTaskCompleted,
    responseHandlers
  );
};

module.exports = { handleAddTask, handleDeleteTask, handleToggleTask };
