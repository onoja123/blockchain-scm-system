import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

/**
 * @author
 * @description Create a product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const createProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get all Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const getAllProducts = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get a Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const getProductById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Get a supplier by id
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const getProductsBySupplier = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Update a Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const updateProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Delete a Product
 * @route `/api/v1/product/`
 * @access Public
 * @type POST
 */
export const deleteProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})