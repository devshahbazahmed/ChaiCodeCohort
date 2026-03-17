const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const allLists = document.querySelector(".lists");

addTaskBtn.addEventListener("click", () => {
  const value = taskInput.value;

  const li = document.createElement("li");
  li.classList.add("list-item");

  const span = document.createElement("span");
  span.textContent = value;

  li.appendChild(span);

  span.addEventListener("dblclick", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.setAttribute("id", "task-input");
    input.value = span.textContent;

    li.replaceChild(input, span);
    input.focus();

    // Save on blur (click outside)
    input.addEventListener("blur", () => {
      span.textContent = input.value;
      li.replaceChild(span, input);
    });

    // Save on Enter key
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        span.textContent = input.value;
        li.replaceChild(span, input);
      }
    });
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(deleteBtn);
  allLists.appendChild(li);

  taskInput.value = "";
});
