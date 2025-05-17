import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitailProducts } from "./services/productService";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB", err);
});

app.use('/user/', userRoute);
app.use('/products', productRoute);

//seed the products to db
seedInitailProducts();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
