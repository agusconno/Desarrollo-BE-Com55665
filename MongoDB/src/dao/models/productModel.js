import mongoose from "mongoose";

const productCollection = "product";  //nombre de la coleccion en la DB

const productSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: Array,
    default: [""]
  },
  code: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "true"
  },
  category: {
    type: String,
    required: true,
  }
})

export const productModel = mongoose.model(productCollection, productSchema);
