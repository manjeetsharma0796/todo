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

const readTaskAndRemoveValue = () => {
  const taskDetailsElement = getTaskDetailElement();
  const taskDetail = taskDetailsElement.value;
  taskDetailsElement.value = '';

  return taskDetail;
};

const addClickEvent = (taskElement) => {
  taskElement.onclick = () => {

  }
};

const readCreateAndAppendTask = () => {
  const todoListContainer = getTodoContainer();
  const task = readTaskAndRemoveValue();
  const taskElement = createTodoElement(task);
  addClickEvent(taskElement);
  todoListContainer.append(taskElement);
};

const main = () => {
  const addTask = getAddTaskElement();

  addTask.onclick = () => {
    readCreateAndAppendTask();
  };
};

window.onload = main;