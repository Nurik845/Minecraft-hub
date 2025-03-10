let inventory = { plank: 6 };
let grid = ["", "", "", ""];
let selectedItem = "";
let craftedItems = { crafting_table: false, sticks: false };

function selectItem(item) {
  selectedItem = item;
}

function placeItem(index) {
  if (selectedItem && inventory[selectedItem] > 0 && grid[index] === "") {
    grid[index] = selectedItem;
    inventory[selectedItem]--;
  } else if (grid[index] !== "") {
    inventory[grid[index]]++;
    grid[index] = "";
  }
  updateUI();
}

function craft() {
  let crafted = false;

  if (grid.every((slot) => slot === "plank")) {
    document.getElementById("result-slot").innerHTML =
      '<img src="assets/crafting_table.png" width="50" onclick="clearResult()">';
    craftedItems.crafting_table = true;
    crafted = true;
  } else if (
    (grid[0] === "plank" && grid[2] === "plank") ||
    (grid[1] === "plank" && grid[3] === "plank")
  ) {
    document.getElementById("result-slot").innerHTML =
      '<img src="assets/sticks.png" width="50" onclick="clearResult()">';
    craftedItems.sticks = true;
    crafted = true;
  } else {
    alert("Неправильный рецепт!");
  }

  if (craftedItems.crafting_table && craftedItems.sticks) {
    alert("Топ, молодец, теперь ты готов играть в Minecraft!");
  }

  grid = ["", "", "", ""];
  updateUI();
}

function clearResult() {
  document.getElementById("result-slot").innerHTML = "";
}

function updateUI() {
  document.getElementById("plank-count").innerText = inventory.plank;
  document.querySelectorAll(".slot").forEach((slot, i) => {
    slot.innerHTML = grid[i]
      ? '<img src="./assets/wood_planks.png" width="50">'
      : "";
  });
}
