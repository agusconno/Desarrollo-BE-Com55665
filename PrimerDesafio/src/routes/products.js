import { Router } from "express";
import { ProductManager } from "../models/productManager.js";

const productManager = new ProductManager('./products.json');
const routerProd = Router();

routerProd.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        let prods = await productManager.getProducts();

        // Ordenar los productos por la propiedad "id"
        prods.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        });

        // Aplicar límite si se proporciona
        const products = limit ? prods.slice(0, parseInt(limit)) : prods;

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send("Error al obtener productos");
    }
});

routerProd.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const prod = await productManager.getProductById(id);

        if (prod) {
            res.status(200).send(prod);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al obtener producto");
    }
});

routerProd.post('/', async (req, res) => {
    try {
        const conf = await productManager.addProduct(req.body);
        if (conf) {
            res.status(201).send("Producto creado");
        } else {
            res.status(400).send("Producto ya existente");
        }
    } catch (error) {
        res.status(500).send("Error al crear producto");
    }
});

routerProd.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conf = await productManager.updateProduct(id, req.body);

        if (conf) {
            res.status(200).send("Producto actualizado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al actualizar producto");
    }
});

routerProd.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conf = await productManager.deleteProduct(id);

        if (conf) {
            res.status(200).send("Producto eliminado correctamente");
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al eliminar producto");
    }
});

export default routerProd;





