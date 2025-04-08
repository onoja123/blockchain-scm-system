import { Document } from "mongoose";

export interface Iorder extends Document{
	product: string,
	quantity: Number,
	location: String,
	lastUpdated: Date
  }

