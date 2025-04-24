import mongoose, { Schema } from "mongoose";
import { Iorder } from "../types/interfaces/order.inter";

const orderSchema = new Schema<Iorder>({
	_orderedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	product: {
		type: String,
	},
	quantity: {
		type: String,
	},
	status: {
		type: String,
	},
	supplier: {
		supplier: String
	},
	deliveryDate: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Order = mongoose.model<Iorder>('Order', orderSchema)

export default Order;