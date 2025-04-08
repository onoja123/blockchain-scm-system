import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

/**
 * @author
 * @description Create a supplier
 * @route `/api/v1/supplier/`
 * @access Public
 * @type POST
 */
export const createSupplier = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get all suppliers
 * @route `/api/v1/supplier/`
 * @access Public
 * @type POST
 */
export const getAllSuppliers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get a supplier
 * @route `/api/v1/supplier/`
 * @access Public
 * @type POST
 */
export const getSupplierById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Update a supplier
 * @route `/api/v1/supplier/`
 * @access Public
 * @type POST
 */
export const updateSupplier = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Delete a supplier
 * @route `/api/v1/supplier/`
 * @access Public
 * @type POST
 */
export const deleteSupplier = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})