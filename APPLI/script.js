document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const clearAllButton = document.getElementById("clearAllButton");
    const taskCounter = document.getElementById("taskCounter");
  
    // Charger les tâches sauvegardées
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    const updateCounter = () => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
     
    };
  
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    const renderTasks = () => {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.className = task.completed ? "completed" : "";
        li.addEventListener("click", () => toggleTask(index));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteTask(index);
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
      });
      updateCounter();
    };
  
    const addTask = () => {
      const taskText = taskInput.value.trim();
      if (taskText === "") return;
      tasks.push({ text: taskText, completed: false });
      taskInput.value = "";
      saveTasks();
      renderTasks();
    };
  
    const toggleTask = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    const deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    const clearAllTasks = () => {
      tasks = [];
      saveTasks();
      renderTasks();
    };
  
    addTaskButton.addEventListener("click", addTask);
    clearAllButton.addEventListener("click", clearAllTasks);
  
    renderTasks(); // Charger les tâches au démarrage
  });