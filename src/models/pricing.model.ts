import mongoose from 'mongoose';
import { IPricing } from '../types/interfaces/pricing.inter';

const PricingSchema = new mongoose.Schema<IPricing>(
	{},
	{ strict: false, timestamps: true }
  );

  const Pricing = mongoose.model<IPricing>('Pricing', PricingSchema);

  export default Pricing;