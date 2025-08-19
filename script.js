let habits = JSON.parse(localStorage.getItem("habits")) || {};

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";

  for (let habit in habits) {
    const div = document.createElement("div");
    div.className = "habit";
    div.innerHTML = `
      <span>${habit} | Streak: ${habits[habit].streak} ${
      habits[habit].done ? "✅ Done" : ""
    }</span>
      <button onclick="toggleHabit('${habit}')">Toggle</button>
    `;
    list.appendChild(div);
  }
}

function addHabit() {
  const input = document.getElementById("habit-input");
  const habit = input.value.trim();

  if (habit && !habits[habit]) {
    habits[habit] = { done: false, streak: 0 };
    saveHabits();
    renderHabits();
  } else {
    alert("Invalid or duplicate habit!");
  }
  input.value = "";
}

function toggleHabit(habit) {
  if (!habits[habit].done) {
    habits[habit].done = true;
    habits[habit].streak++;
  } else {
    habits[habit].done = false;
    habits[habit].streak = Math.max(0, habits[habit].streak - 1);
  }
  saveHabits();
  renderHabits();
}

document.getElementById("add-btn").addEventListener("click", addHabit);

// Auto-reset every new day
const today = new Date().toLocaleDateString();
const lastUpdate = localStorage.getItem("lastUpdate");

if (lastUpdate !== today) {
  for (let habit in habits) {
    habits[habit].done = false;
  }
  localStorage.setItem("lastUpdate", today);
  saveHabits();
}

renderHabits();