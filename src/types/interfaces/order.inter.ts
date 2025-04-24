import mongoose, { Document, Schema } from "mongoose";

export interface Iorder extends Document{
	_orderedBy:  Schema.Types.ObjectId | string;
	products: {
		productId: string;
		quantity: number;
		unitPrice: number;
	  }[];
	quantity: Number,
	status: "pending" | "approved" | "shipped" | "delivered" | "cancelled";
	paymentMethod: string;
	deliveryDate: Date,
	note?: string;
	createdAt: Date
  }

