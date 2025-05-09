import mongoose, { Schema } from "mongoose";
import { Iorder } from "../types/interfaces/order.inter";

const orderSchema = new Schema<Iorder>({
	_orderedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	products: [
		{
		  productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true
		  },
		  quantity: {
			type: Number,
			required: true
		  },
		  unitPrice: {
			type: Number,
			required: true
		  }
		}
	],
	currentLocation:{
		latitude: {
			type: Number,
			required: true
		},
		longitude: {
			type: Number,
			required: true
		}
	},
	quantity: {
		type: String,
	},
	status: {
		type: String,
	},
	paymentMethod: {
		supplier: String
	},
	deliveryDate: {
		type: Date,
	},
	note: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Order = mongoose.model<Iorder>('Order', orderSchema)

export default Order;