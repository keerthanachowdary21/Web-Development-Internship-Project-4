document.addEventListener("DOMContentLoaded", function() {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      taskList.appendChild(li);

      // Add event listener for checkbox
      const checkbox = li.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", function() {
        tasks[index].completed = this.checked;
        saveTasks();
      });

      // Add event listener for delete button
      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function() {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
    });
  }

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add new task
  addTaskBtn.addEventListener("click", function() {
    const text = taskInput.value.trim();
    if (text !== "") {
      tasks.push({ text: text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  // Initial render
  renderTasks();
});
