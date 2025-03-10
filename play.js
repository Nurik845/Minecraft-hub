function selectMode(mode) {
  document
    .querySelectorAll(".mode-btn")
    .forEach((btn) => (btn.style.background = "#b0b0b0"));
  document
    .querySelectorAll(".mode-btn")
    .forEach((btn) => (btn.style.color = "black"));
  document
    .querySelectorAll(".mode-btn")
    .forEach((btn) => (btn.style.borderColor = "black"));

  let selectedButton = document.querySelector(
    `button[onclick="selectMode('${mode}')"]`
  );
  selectedButton.style.background = "#00aa00";
  selectedButton.style.color = "white";
  selectedButton.style.borderColor = "#006600";

  localStorage.setItem("selectedMode", mode);
}

function createWorld() {
  let worldName = document.getElementById("world-name").value.trim();
  if (!worldName) {
    alert("Please enter a world name!");
    return;
  }

  let mode = localStorage.getItem("selectedMode");
  if (!mode) {
    alert("Please select a game mode!");
    return;
  }

  alert(`Creating world: ${worldName} in ${mode} mode!`);
}

function goBack() {
  window.location.href = "index.html";
}
