const todoInput = document.querySelector(".input");
const addTodoBtn = document.querySelector(".add-btn");
const allTodos = document.querySelector(".todos");

// async function fetchQuotes() {
//   const response = await fetch("https://api.freeapi.app/api/v1/public/quotes");
//   const data = await response.json();

//   for (let obj of data.data.data) {
//     const li = document.createElement("li");
//     li.innerHTML = obj.content;

//     li.addEventListener("click", function () {
//       li.remove();
//     });

//     allTodos.appendChild(li);
//   }
// }

// fetchQuotes();

(async () => {
  fetch("https://api.freeapi.app/api/v1/public/quotes", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      for (const obj of data.data.data) {
        const li = document.createElement("li");
        li.innerHTML = obj.content;

        li.addEventListener("click", function () {
          li.remove();
        });

        allTodos.appendChild(li);
      }
    });
})();

addTodoBtn.addEventListener("click", async function () {
  const value = todoInput.value;

  const li = document.createElement("li");
  li.innerHTML = value;

  li.addEventListener("click", function () {
    li.remove();
  });

  allTodos.appendChild(li);

  todoInput.value = "";
});
