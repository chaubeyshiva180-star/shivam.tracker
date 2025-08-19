const scheduleList = document.getElementById("scheduleList");
const addTaskForm = document.getElementById("addTask");

addTaskForm.onsubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById("taskName").value;
  const time = new Date(document.getElementById("taskTime").value);

  if (isNaN(time.getTime()) || time < new Date()) {
    alert("Enter a valid future time!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `<span>${name}</span>
    <span class="task-time">${time.toLocaleString()}</span>`;
  scheduleList.appendChild(li);

  const delay = time.getTime() - new Date().getTime();
  setTimeout(() => {

// Optional: play a sound
let audio = new Audio("gaana/Victory Anthem - PagalWorld.mp3");
audio.play();

// Optional: Desktop notification (requires permission)
if (Notification.permission === "granted") {
  new Notification(`It's time for: ${name}`);
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      new Notification(`It's time for: ${name}`);
    }
  });
}

  }, delay);

  addTaskForm.reset();
};

// Ask for notification permission
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}