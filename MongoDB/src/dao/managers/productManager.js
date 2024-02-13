import Product from '../models/productModel.js'; 
import crypto from 'crypto';

export class ProductManager {
    constructor() {
    }

    async getProducts() {
        try {
            return await Product.find();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    async getProductById(id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.error('Error al obtener producto por ID:', error);
            throw error;
        }
    }

    async addProduct(productData) {
        try {
            const existProd = await Product.findOne({ code: productData.code });
            if (existProd) {
                return false; // El producto ya existe
            } else {
                productData.id = crypto.randomBytes(15).toString('hex');
                const newProduct = new Product(productData);
                await newProduct.save();
                return true; // Producto agregado exitosamente
            }
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    }

    async updateProduct(id, productData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
            return !!updatedProduct; // Devuelve true si el producto se actualizó correctamente, de lo contrario false
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            return !!deletedProduct; // Devuelve true si el producto se eliminó correctamente, de lo contrario false
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}
