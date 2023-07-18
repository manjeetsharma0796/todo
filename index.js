const getTodoContainer = () => document.querySelector('#todo-list');

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

const main = () => {
  const todoListContainer = getTodoContainer();
  const todoList = ['Buy eggs from supermarket.',
    'Finish Code Of Conduct training on campus.',
    'Finish day 15 part 2 of Advent of Code problem.'];

  removeAllChild(todoListContainer);
  const todoElements = todoList.map((todo) => {
     return createTodoElement(todo);
  })

  appendTodo(todoListContainer, todoElements);
}

window.onload = () => {
};