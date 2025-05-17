import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitailProducts = async () => {
    const products = [
        {
            title: "dell laptop",
            price: 10000,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCjrorxF6jNh0MNE37FShP6zvEGiYkbwXcrQ&s",
            stock: 10,
        }
    ]
    const existingProducts = await productModel.find();
    if (existingProducts.length === 0) {
        await productModel.insertMany(products);
    }
}