"use strict";

const newTask = document.querySelector("input[type='text']");
const addTaskBtn = document.querySelector(".btn-add");
const doneTaskBtn = document.querySelector(".btn-done");
const removeTaskBtn = document.querySelector(".btn-remove");
const clearBtn = document.querySelectorAll(".clear");
const todoContainer = document.querySelector(".todo-tasks-container");
const doneContainer = document.querySelector(".done-tasks-container");
const tasksToDo = [];
const tasksDone = [];

const addTaskToDo = (taskName) => {
  const task = `
  <div class="task todo">
    <p class="task-name">${taskName}</p>
    <div class="buttons-container">
      <button class="btn-done">
        <svg
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.785 1.674L6.785 12.674a.902.902 0 0 1-.893.172.897.897 0 0 1-.527-.527L0.999 7.861a.633.633 0 0 1-.001-.749.632.632 0 0 1 .748-.749L6.299 11.216 16.812.701a.899.899 0 0 1 1.023.023.898.898 0 0 1 .023 1.023z"
            fill="currentColor"
          />
        </svg>
      </button>
      <button class="btn-remove">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.611 3.125H1.486a.625.625 0 0 0-.488.198.626.626 0 0 0-.197.488v.062c0 .185.072.36.197.488a.625.625 0 0 0 .488.198h.687v12.375c0 .651.528 1.188 1.188 1.188h11.75c.651 0 1.188-.537 1.188-1.188V4.5h.687a.625.625 0 0 0 .488-.198.626.626 0 0 0 .197-.488v-.062a.626.626 0 0 0-.197-.488.625.625 0 0 0-.488-.198zM14.549 16.875H3.549V4.5h11v12.375zM5.611 0.375a.625.625 0 0 0-.488.198.626.626 0 0 0-.197.488v.062c0 .185.072.36.197.488a.625.625 0 0 0 .488.198h6.875a.625.625 0 0 0 .488-.198.626.626 0 0 0 .197-.488v-.062a.626.626 0 0 0-.197-.488.625.625 0 0 0-.488-.198H5.611z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
`;
  todoContainer.insertAdjacentHTML("beforeend", task);
};
const addTaskDone = (taskName) => {
  const task = `
    <div class="task done">
      <p>${taskName}</p>
    </div>
  `;
  doneContainer.insertAdjacentHTML("beforeend", task);
};
const errorMsg = (msg) => {
  const error = document.createElement("p");
  error.classList.add("error");
  error.textContent = msg;
  newTask.parentElement.appendChild(error);
};

addTaskBtn.addEventListener("click", () => {
  newTask.parentElement.querySelector(".error")?.remove();
  if (!newTask.value) {
    errorMsg("Todo is required");
    return;
  } else if (newTask.value.length < 3) {
    errorMsg("Todo must be at least 3 characters long");
    return;
  }
  tasksToDo.push(newTask.value);
  localStorage.setItem(`tasksToDo`, JSON.stringify(tasksToDo));
  addTaskToDo(newTask.value);
  newTask.value = "";
  todoContainer.parentElement.querySelector(
    "h2"
  ).textContent = `Tasks to do - ${tasksToDo.length}`;
});

todoContainer.addEventListener("click", (e) => {
  if (e.target.closest(".btn-done")) {
    const currentToDo = e.target.closest(".task");
    const task = currentToDo.querySelector(".task-name").textContent;
    currentToDo.remove();
    tasksToDo.splice(tasksToDo.indexOf(task), 1);
    tasksDone.push(task);
    addTaskDone(task);
    tasksToDo.length
      ? localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo))
      : localStorage.removeItem("tasksToDo");
    localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
  }
  todoContainer.parentElement.querySelector(
    "h2"
  ).textContent = `Tasks to do - ${tasksToDo.length}`;
  doneContainer.parentElement.querySelector(
    "h2"
  ).textContent = `Done - ${tasksDone.length}`;
});

todoContainer.addEventListener("click", (e) => {
  if (e.target.closest(".btn-remove")) {
    const currentToDo = e.target.closest(".task");
    const task = currentToDo.querySelector(".task-name").textContent;
    currentToDo.remove();
    tasksToDo.splice(tasksToDo.indexOf(task), 1);
    tasksToDo.length
      ? localStorage.setItem("tasksToDo", JSON.stringify(tasksToDo))
      : localStorage.removeItem("tasksToDo");
  }
  todoContainer.parentElement.querySelector(
    "h2"
  ).textContent = `Tasks to do - ${tasksToDo.length}`;
});

clearBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    const tasksContainer = btn.parentElement.nextElementSibling;
    const header = btn.previousElementSibling;
    tasksContainer.innerHTML = "";
    if (tasksContainer === todoContainer) {
      tasksToDo.length = 0;
      header.textContent = "Tasks to do - 0";
      localStorage.removeItem("tasksToDo");
    } else {
      tasksDone.length = 0;
      header.textContent = "Done - 0";
      localStorage.removeItem("tasksDone");
    }
  })
);

window.addEventListener("load", () => {
  const savedTasksToDo = JSON.parse(localStorage.getItem("tasksToDo"));
  const savedTasksDone = JSON.parse(localStorage.getItem("tasksDone"));

  savedTasksToDo?.forEach((taskToDo) => {
    addTaskToDo(taskToDo);
    tasksToDo.push(taskToDo);
    todoContainer.parentElement.querySelector(
      "h2"
    ).textContent = `Tasks to do - ${tasksToDo.length}`;
  });
  savedTasksDone?.forEach((taskDone) => {
    addTaskDone(taskDone);
    tasksDone.push(taskDone);
    doneContainer.parentElement.querySelector(
      "h2"
    ).textContent = `Done - ${tasksDone.length}`;
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});
