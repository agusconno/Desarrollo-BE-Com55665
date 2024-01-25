import express from 'express'
import routerProd from './routes/products.js'
import { __dirname } from './path.js'
import path from 'path'
import routerCart from './routes/carts.js'
import { engine } from 'express-handlebars';
import { createServer } from "node:http";
import { Server } from "socket.io";
import routerHome from './routes/home.js';
import { routerRealTime } from './routes/realTimeProducts.js';
import { ProductManager } from "./models/productManager.js";

const productManager = new ProductManager('./products.json'); 

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
app.use('/api/products', routerProd);
app.use('/api/carts', routerCart);
app.use('/home', routerHome);
app.use('/realtimeproducts', routerRealTime);

// Socket eventos
io.on("connection", (socket) => {
    console.log("usuario conectado");
  
    socket.on("getProducts", async () => {
      const products = await productManager.getProducts();
      io.emit("prodsData", products);
    });
  
    socket.on("newProduct", async (newProd) => {
      console.log(newProd);
      await productManager.addProduct(newProd);
      const products = await productManager.getProducts();
      io.emit("prodsData", products);
    });

    socket.on("removeProduct", async (prodId) => {
      await productManager.deleteProduct(prodId);
      io.emit("productRemoved", prodId); 
    });
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});