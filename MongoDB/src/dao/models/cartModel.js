import mongoose from 'mongoose';

const cartCollection = 'carts';  // Nombre de la colección en la base de datos

const CartSchema = new mongoose.Schema({
    products: [
        {
          id: {
            type: String,
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
    ],
});

const Cart = mongoose.model(cartCollection, CartSchema);

export default Cart;
