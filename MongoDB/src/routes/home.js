import { Router } from 'express';
import ProductManager from '../dao/managers/productManager.js'; 

const routerHome = Router();
const productManager = new ProductManager(); 

routerHome.get('/', async (req, res, next) => {
  try {
    const products = await productManager.getProducts(); 
    res.render('pages/home', { products: products });
  } catch (error) {
    console.error('Error al obtener la lista de productos:', error);
    res.render('error', { message: 'Error al obtener la lista de productos' });
  }
});

export default routerHome;

