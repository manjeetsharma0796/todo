const getTodoContainer = () => document.querySelector('#todo-list');

const removeAllChild = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

window.onload = () => {
  const todoListContainer = getTodoContainer();
  console.log(todoListContainer);
  removeAllChild(todoListContainer);
}