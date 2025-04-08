import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

/**
 * @author
 * @description add an inventory item
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const addInventoryItem = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get all inventories
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const getAllInventory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get an inventory by id
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const getInventoryById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Get an inventory by  product id
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const getInventoryByProduct = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Update an Inventory
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const updateInventory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Delete an Inventory(admin)
 * @route `/api/v1/inventory/`
 * @access Public
 * @type POST
 */
export const deleteInventory = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})