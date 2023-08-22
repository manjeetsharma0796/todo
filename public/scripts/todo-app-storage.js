class TodoAppStorage {
  constructor() {}

  store(todosDetails) {
    localStorage.setItem("todos", JSON.stringify(todosDetails));
  }

  get todosSession() {
    const todosSession = localStorage.getItem("todos") || "[]";
    return JSON.parse(todosSession);
  }
}
