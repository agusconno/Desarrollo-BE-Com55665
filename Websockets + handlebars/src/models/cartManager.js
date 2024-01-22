// cartManager.js

import { promises as fs } from 'fs';
import crypto from 'crypto';

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      return [];
    }
  }

  async saveCarts(carts) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(carts), 'utf-8');
    } catch (error) {
      console.error('Error al guardar carrito:', error);
    }
  }

  async createCart() {
    const newCart = {
      id: crypto.randomBytes(16).toString('hex'),
      products: [],
    };

    const carts = await this.getCarts();
    carts.push(newCart);

    await this.saveCarts(carts);

    return newCart;
  }

  async getCartById(cartId) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === cartId);
  }

  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cartId);

    if (cart) {
      const existingProduct = cart.products.find(p => p.product === productId);

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await this.saveCarts(carts);

      return cart.products;
    } else {
      throw new Error('Carrito no encontrado');
    }
  }
}
