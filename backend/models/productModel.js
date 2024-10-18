import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, require:true},
    price: {type: Number, require:true},
    category: {type: String, require:true},
    subCategory: {type: String, require:true},
    sizes: {type: Array, require:true},
    bestseller: {type: Boolean},
    images: {type: Array, require:true},
    date: {type: Number, require:true}
})

const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel