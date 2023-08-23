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
      if (res.status === 201) {
        onResponse();
      }
    });
  }
}
