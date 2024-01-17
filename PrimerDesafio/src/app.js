import express from 'express'
import routerProd from './routes/products.js'
import { __dirname } from './path.js'
import path from 'path'
import routerCart from './routes/carts.js'


const PORT = 8080
const app = express()

//Middlewares
app.use(express.json()) //Permitir enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true })) //Permitir extensiones en la url
app.use('/static', express.static(path.join(__dirname, '/public')))
console.log(path.join(__dirname, '/public'))

//Routes
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)

app.listen(PORT, () => {
    console.log(`Servidor escuchando ${PORT}`)
})