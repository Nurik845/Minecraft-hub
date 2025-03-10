function sendMessage() {
  let input = document.getElementById("chat-input");
  let message = input.value.trim();

  if (message !== "") {
    let chatBox = document.getElementById("chat-box");
    let newMessage = document.createElement("div");
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
    input.value = "";
  }
}

function clearChat() {
  document.getElementById("chat-box").innerHTML = "";
}
