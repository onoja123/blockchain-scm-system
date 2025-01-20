import express from "express";
import { 
    getPricing,
    generatePricing
} from "../controllers/pricing.contoller";
import MiddlewareService from "../middlewares/auth.middleware";

const PricingRouter = express.Router()

PricingRouter.use(MiddlewareService.protect)

PricingRouter.get('/get-pricing', getPricing)

PricingRouter.post('/generate-pricing', generatePricing);

export default PricingRouter;