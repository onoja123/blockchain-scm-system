import mongoose from 'mongoose';
import { IPricing } from '../types/interfaces/pricing.inter';
import { string } from 'joi';

export const PricingSchema = new mongoose.Schema<IPricing>({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    projectDescription: {
		type: String,
	},
    requiredTimeline: {
		type: String,
	},
    advancedFeatures: {
		type: [string],
	},
    companySize: {
		type: String,
	},
    approxNumberOfScreens: {
		type: Number,
	},
    currency: {
		type: String,
	},
    estimatedCost: {
		type: Number,
	},
});

const Pricing = mongoose.model<IPricing>('Pricing', PricingSchema);

export default Pricing;
