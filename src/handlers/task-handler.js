const handleAddTask = (req, res) => {
  const { todoController } = req.app;
  const responseHandlers = {
    onSuccess: () => res.status(201).end(),
    onError: () => res.status(500).end(),
  };

  todoController.addTask(
    req.body.description,
    parseInt(req.params.todoID),
    false,
    responseHandlers
  );
};

const handleDeleteTask = (req, res) => {
  const { todoController } = req.app;
  const { todoID, taskID } = req.params;
  const responseHandlers = {
    onSuccess: () => res.status(204).end(),
    onError: () => res.status(500).end(),
  };

  todoController.deleteTask(
    parseInt(taskID),
    parseInt(todoID),
    responseHandlers
  );
};

const handleToggleTask = (req, res) => {
  const { todoController } = req.app;
  const { todoID, taskID } = req.params;
  const responseHandlers = {
    onSuccess: () => res.status(204).end(),
    onError: () => res.status(500).end(),
  };

  todoController.patchTaskStatus(
    parseInt(taskID),
    parseInt(todoID),
    req.body.isTaskCompleted,
    responseHandlers
  );
};

module.exports = { handleAddTask, handleDeleteTask, handleToggleTask };
