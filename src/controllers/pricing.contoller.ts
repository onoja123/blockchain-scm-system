import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import ResponseHelper from "../utils/response";
import PricingService from "../services/pricing.service";

const pricingService = new PricingService();


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Get pricing information of all generated invoice
 * @route `/api/v1/pricing/get-pricing`
 * @access Private
 * @type GET
 **/
export const getPricing = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const pricingRecords = await pricingService.getPricing(req.user?.id);

    return res.status(200).json({
      status: "success",
      data: pricingRecords,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});


/**
 * @author Okpe Onoja <okpeonoja18@gmail.com>
 * @description Generate pricing invoice
 * @route `/api/v1/pricing/generate-pricing`
 * @access Private
 * @type PSOT
 **/
export const generatePricing = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {

    const result = await pricingService.generatePricing(req.user?.id, req.body.pricingDetails);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return next(new AppError("An error occurred. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
  }
});
