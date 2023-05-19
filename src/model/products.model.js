import { Int32 } from "bson";
import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    price: { type: Number, required: true},
    thumbnail: { type: String, required: true},
    code: { type: String, required: true},
    stock: { type: String, required: true},
    status: { type: Boolean}
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel