import express from 'express'
import routerProd from './routes/products.js'
import { __dirname } from './path.js'
import path from 'path'
import routerCart from './routes/carts.js'
import { engine } from 'express-handlebars';
import { createServer } from "node:http";
import { Server } from "socket.io";


const PORT = 8080
const app = express();
const server = createServer(app);
const io = new Server(server);

//Middlewares
app.use(express.json()) //Permitir enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true })) //Permitir extensiones en la url
app.use(express.static(__dirname+'/public'))
//app.use('/static', express.static(path.join(__dirname, '/public')))
//console.log(path.join(__dirname, '/public'))


//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname+"/views");

//Routes
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)

//Socket


server.listen(PORT, () => {
    console.log(`Servidor escuchando ${PORT}`)
});