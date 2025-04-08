import mongoose, { Document, Schema } from "mongoose";

export interface Iorder extends Document{
	product: string,
	quantity: Number,
	status: String,
	orderedBy: string,
	supplier: string,
	deliveryDate: Date,
	createdAt: Date
  }

