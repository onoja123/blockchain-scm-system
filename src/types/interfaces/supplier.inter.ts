import mongoose, { Document, Schema } from "mongoose";

export interface Isupplier extends Document{
	_user:  Schema.Types.ObjectId | string;
	name: String,
	contactEmail: String,
	phoneNumber: String,
	address: String,
	productsSupplied: string[],
	createdAt: Date,
	updatedAt: Date
}
