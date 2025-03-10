document.addEventListener("DOMContentLoaded", function () {
  fetch("worlds.json")
    .then((response) => response.json())
    .then((data) => {
      let worldList = document.getElementById("world-list");
      data.worlds.forEach((world) => {
        let listItem = document.createElement("li");
        listItem.textContent = world;
        listItem.onclick = function () {
          launchMinecraftWithWorld(world);
        };
        worldList.appendChild(listItem);
      });
    });

  document
    .getElementById("launch-minecraft")
    .addEventListener("click", function () {
      window.location.href = "start-minecraft.bat";
    });
});

function launchMinecraftWithWorld(worldName) {
  let batFileContent = `@echo off\nstart "" "C:\\Users\\admin\\AppData\\Roaming\\.minecraft\\TLauncher.exe"\ntimeout /t 5\nstart "" "C:\\Users\\admin\\AppData\\Roaming\\.minecraft\\saves\\${worldName}"\nexit`;

  let blob = new Blob([batFileContent], { type: "text/plain" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "start-minecraft.bat";
  a.click();
}
