import mongoose, { Document, Schema } from "mongoose";

export interface Isupplier extends Document{
	name: String,
	contactEmail: String,
	phoneNumber: String,
	address: String,
	productsSupplied: string[],
	createdAt: Date,
	updatedAt: Date
}
