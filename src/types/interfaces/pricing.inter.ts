import mongoose, { Document, Schema, Types } from "mongoose";
import { Currency } from "../enums/currency";

export interface IPricing extends Document {
    _user: Schema.Types.ObjectId | string;
    projectDescription: string;
    requiredTimeline: string;
    // advancedFeatures: string[];
    companySize?: string;
    approxNumberOfScreens?: number;
    currency: Currency
    estimatedCost: number;
  }
