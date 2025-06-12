import mongoose, {Schema , Document, ObjectId} from "mongoose";
import { IProduct } from "./productModel";

export interface ICartItem extends Document {
    product : IProduct;
    unitPrice: number;
    quntity: number;
}

export interface ICart extends Document {
    userId: ObjectId | string;
    items: [];
    totalAmout: number;
    status: "active" | "completed";
}


const cartItemSchema = new Schema<ICartItem>({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    quntity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const cartSchema = new Schema<ICart>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [cartItemSchema],
    totalAmout: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active",
    },
});


export const cartModel = mongoose.model<ICart>("Cart", cartSchema);