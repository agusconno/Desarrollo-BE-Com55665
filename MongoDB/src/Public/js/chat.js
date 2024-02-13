import io from "socket.io-client";

// Establecer conexión con el servidor Socket.io
const socket = io();

// Manejar evento de conexión
socket.on("connect", () => {
  console.log("Conectado al servidor de Socket.io");
});

// Manejar evento de desconexión
socket.on("disconnect", () => {
  console.log("Desconectado del servidor de Socket.io");
});

// Manejar evento de nuevo mensaje recibido
socket.on("newMessage", (message) => {
  console.log("Nuevo mensaje recibido:", message);
  renderMessage(message);
});

// Función para enviar un nuevo mensaje al servidor
function sendMessage() {
  const user = document.getElementById("msg-user").value;
  const content = document.getElementById("msg-content").value;
  const message = { user, content };
  
  // Emitir evento al servidor con el mensaje
  socket.emit("newMessage", message);
}

// Función para renderizar un mensaje 
function renderMessage(message) {
  const chatContainer = document.getElementById("chat-container");
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message");
  messageElement.innerHTML = `
    <strong>${message.user}</strong>: ${message.content}
  `;
  chatContainer.appendChild(messageElement);
}

// Manejar envío de formulario
const messageForm = document.getElementById("message-form");
messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
  messageForm.reset(); // Limpiar el formulario después de enviar el mensaje
});
