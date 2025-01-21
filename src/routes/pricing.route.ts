import express from "express";
import { 
    getPricing,
    getPricingById,
    generatePricing
} from "../controllers/pricing.contoller";
import MiddlewareService from "../middlewares/auth.middleware";

const PricingRouter = express.Router()

PricingRouter.use(MiddlewareService.protect)

PricingRouter.get('/get-pricing', getPricing)

PricingRouter.get('/one-pricing/:pricingId', getPricingById);

PricingRouter.post('/generate-pricing', generatePricing);

export default PricingRouter;