import mongoose, { Document, Schema } from "mongoose";

export interface Iorder extends Document{
	_orderedBy:  Schema.Types.ObjectId | string;
	product: string,
	quantity: Number,
	status: String,
	supplier: string,
	deliveryDate: Date,
	createdAt: Date
  }

