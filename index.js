const getTodoContainer = () => document.querySelector('#todo-list');
const getAddTaskElement = () => document.querySelector('#add-task');
const getTaskDetailElement = () => document.querySelector('#task-details');

const removeAllChild = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const createTodoElement = (todoText) => {
  const todoNode = document.createElement('p');
  todoNode.innerText = todoText;
  return todoNode;
};

const appendTodo = (container, todoElements) => {
  todoElements.forEach(todoElement => {
    container.appendChild(todoElement);
  });
};

const readTask = () => {
  const taskDetailsElement = getTaskDetailElement();
  return taskDetailsElement.value;
}

const main = () => {
  const todoListContainer = getTodoContainer();
  const addTask = getAddTaskElement();

  addTask.onclick = () => {
    readTask();
  };
};

window.onload = main;