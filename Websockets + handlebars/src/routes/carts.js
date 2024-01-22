// carts.js

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { CartManager } from '../models/cartManager.js';



const routerCart = Router();
const cartManager = new CartManager('./carts.json');

// Middleware para cargar los carritos desde el archivo JSON
const loadCarts = async (req, res, next) => {
  try {
    req.carts = await cartManager.getCarts();
    next();
  } catch (error) {
    console.error('Error al cargar carrito:', error);
    res.status(500).json({ error: 'Error inesperado en el servidor' });
  }
};

// Middleware para guardar los carritos en el archivo JSON
const saveCarts = async (carts) => {
  await cartManager.saveCarts(carts);
};

// Rutas
routerCart.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    handleCartError(res, error);
  }
});

routerCart.get('/:cid', loadCarts, (req, res) => {
  const { cid } = req.params;
  const cart = req.carts.find((c) => c.id === cid);

  if (cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

routerCart.post('/:cid/product/:pid', loadCarts, async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const products = await cartManager.addProductToCart(cid, pid, quantity);
    res.status(201).json(products);
  } catch (error) {
    handleCartError(res, error);
  }
});

const handleCartError = (res, error) => {
  console.error('Error en el carrito:', error.message);
  res.status(400).json({ error: error.message });
};

export default routerCart;


