import { Router } from "express";
import { ProductManager } from '../models/productManager.js';

const homeRouter = Router();
const productManager = new ProductManager('path/to/products.json');

homeRouter.get('/', async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products: products });
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    res.render('error', { message: 'Error al obtener la lista de productos' });
  }
});

export default homeRouter;
