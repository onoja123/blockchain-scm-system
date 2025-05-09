import mongoose, { Document, Schema } from "mongoose";

interface CurrentLocation {
	latitude: number;
	longitude: number;
}

export interface Iorder extends Document{
	_orderedBy:  Schema.Types.ObjectId | string;
	products: {
		productId: string;
		quantity: number;
		unitPrice: number;
	  }[];
	quantity: Number,
	currentLocation: CurrentLocation;
	status: "pending" | "approved" | "shipped" | "delivered" | "cancelled";
	paymentMethod: string;
	deliveryDate: Date,
	note?: string;
	createdAt: Date
  }

