import { Router } from 'express';
import Cart from '../dao/models/cartModel.js'; 

const routerCart = Router();

routerCart.post('/', async (req, res) => {
  try {
    const newCart = new Cart(); // Crear una nueva instancia del modelo Cart
    await newCart.save(); // Guardar el nuevo carrito en la base de datos
    res.status(201).json(newCart); // Enviar respuesta con el nuevo carrito creado
  } catch (error) {
    handleCartError(res, error); // Manejar errores
  }
});

routerCart.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await Cart.findById(cid); // Buscar el carrito por su ID en la base de datos
    if (cart) {
      res.status(200).json(cart.products); // Enviar los productos del carrito como respuesta si se encuentra
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' }); // Enviar mensaje de error si el carrito no se encuentra
    }
  } catch (error) {
    handleCartError(res, error); // Manejar errores
  }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findById(cid); // Buscar el carrito por su ID en la base de datos
    if (cart) {
      cart.products.push({ product: pid, quantity }); // Agregar un nuevo producto al carrito
      await cart.save(); // Guardar los cambios en la base de datos
      res.status(201).json(cart.products); // Enviar los productos del carrito como respuesta
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' }); // Enviar mensaje de error si el carrito no se encuentra
    }
  } catch (error) {
    handleCartError(res, error); // Manejar errores
  }
});

const handleCartError = (res, error) => {
  console.error('Error en el carrito:', error.message);
  res.status(400).json({ error: error.message }); // Enviar mensaje de error con el código de estado 400
};

export default routerCart;



