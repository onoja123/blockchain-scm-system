import mongoose, { Document, Schema } from "mongoose";

export interface Iproduct extends Document{
	name: String,
	description: String,
	category: String,
	price: Number,
	unit: String,
	supplier: String,
	createdAt: Date,
	updatedAt: Date
  }

