import express from 'express';
import dbConnect from "./dao/db.js";
import { __dirname } from './path.js';
import path from 'path';
import { engine } from 'express-handlebars';
import { createServer } from "node:http";
import { Server } from "socket.io";

// Rutas y managers
import routerProd from "./routes/products.js";
import routerCart from "./routes/carts.js";
import routerHome from "./routes/home.js";
import { routerRealTimeProducts } from "./routes/realTimeProducts.js";
import chatRouter from "./routes/chat.js";

import { ProductManager } from "./dao/managers/productManager.js";
import { MessagesManager } from "./dao/managers/message.js"; // Importar MessagesManager

const productManager = new ProductManager();
const messagesManager = new MessagesManager(); // Instanciar MessagesManager

const PORT = 8080;
const app = express();
const server = createServer(app);
const io = new Server(server);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);
app.use("/home", routerHome);
app.use("/realtimeproducts", routerRealTimeProducts);
app.use("/chat", chatRouter);

// Socket eventos
io.on("connection", (socket) => {
    console.log("Usuario conectado");

    socket.on('getMessages', async () => {
        try {
            const messages = await messagesManager.getMessages();
            socket.emit('allMessages', messages);
        } catch (error) {
            console.error('Error al obtener los mensajes:', error);
        }
    });

    socket.on('newMessage', async ({ user, message }) => {
        try {
            const newMessage = await messagesManager.sendMessage(user, message);
            io.emit('newMessage', newMessage); 
        } catch (error) {
            console.error('Error al agregar un nuevo mensaje:', error);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    dbConnect();
});
