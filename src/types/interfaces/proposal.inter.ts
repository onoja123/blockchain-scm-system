import { Document, Schema } from "mongoose";
import { Currency } from "../enums/currency";

export interface IProposal extends Document {
    _user: Schema.Types.ObjectId | string;
    projectDescription: string;
    title: string;
    requiredTimeline: string;
    // advancedFeatures: string[];
    companySize?: string;
    approxNumberOfScreens?: number;
    currency: Currency
    estimatedCost: number;
  }
