import Cart from '../models/cartModel.js'; 
import crypto from 'crypto';

export class CartManager {
    constructor() {

    }

    async getCarts() {
        try {
            return await Cart.find();
        } catch (error) {
            console.error('Error al cargar carritos:', error);
            return [];
        }
    }

    async saveCarts(carts) {
        try {
        } catch (error) {
            console.error('Error al guardar carritos:', error);
        }
    }

    async createCart() {
        try {
            const newCart = new Cart({ products: [] }); 
            await newCart.save(); // Guardar el nuevo carrito en la base de datos
            return newCart;
        } catch (error) {
            console.error('Error al crear un nuevo carrito:', error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            return await Cart.findById(cartId);
        } catch (error) {
            console.error('Error al obtener el carrito por ID:', error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProductIndex = cart.products.findIndex(p => p.product.equals(productId));
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            await cart.save(); // Guardar los cambios en el carrito
            return cart.products;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }
}

