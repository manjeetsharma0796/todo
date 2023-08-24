class WebClient {
  constructor() {}

  addTodo(title, onResponse) {
    const request = {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/todos/todo", request).then((res) => {
      if (res.status === 201) onResponse();
    });
  }

  addTask(description, todoID, onResponse) {
    const request = {
      method: "POST",
      body: JSON.stringify({ description }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/todos/todo/${todoID}/task`, request).then((res) => {
      if (res.status === 201) onResponse();
    });
  }

  deleteTask(taskID, todoID, onResponse) {
    const request = {
      method: "DELETE",
    };

    fetch(`/todos/todo/${todoID}/task/${taskID}`, request).then((res) => {
      if (res.status === 204) onResponse();
    });
  }

  toggleStatus(taskID, todoID, isTaskCompleted, onResponse) {
    const request = {
      method: "PATCH",
      body: JSON.stringify({ isTaskCompleted }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`/todos/todo/${todoID}/task/${taskID}`, request).then((res) => {
      if (res.status === 204) onResponse();
    });
  }

  restoreTodos(onResponse) {
    fetch("/todos")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(onResponse);
  }
}
