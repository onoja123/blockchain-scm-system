import { Document } from "mongoose";

export interface Iinventory extends Document{
	product: string,
	quantity: Number,
	location: String,
	lastUpdated: Date
  }

