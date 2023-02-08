// variables
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const pendingTask = document.getElementById("pending-task");
let pendingCount = 0;

//Logic: whether item should be added in to-do list or not
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoValue = todoInput.value;
  if (!todoValue) {
    return;
  }

  addTodo(todoValue);
  todoInput.value = "";
});

// Logic: Item added to todo-list and visible to client as well as  maintaining the pending task count also.
function addTodo(value) {
  pendingCount += 1;
  updatePendingCount();

  // create new div element and append to #todo-list.
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `
        <span>${value}</span>
        <div class="btns">
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
  todoList.appendChild(todoItem);

  //Complete btn and delete btn creation
  const completeBtn = todoItem.querySelector(".complete-btn");
  const deleteBtn = todoItem.querySelector(".delete-btn");

  //Logic: complete btn
  completeBtn.addEventListener("click", () => {
    todoItem.style.backgroundColor = "#74c674";
    todoItem.style.textDecoration = "line-through";
    completeBtn.style.display = "none";
    if (pendingCount > 0) {
      pendingCount -= 1;
    }
    updatePendingCount();
  });
  //Logic: delete btn

  deleteBtn.addEventListener("click", () => {
    todoList.removeChild(todoItem);
    if (!todoItem.style.textDecoration) {
      pendingCount -= 1;
    }
    updatePendingCount();
  });
}

// Logic : Show total pending task to client.
function updatePendingCount() {
  pendingTask.innerHTML = `Pending Tasks: ${pendingCount}`;
}
