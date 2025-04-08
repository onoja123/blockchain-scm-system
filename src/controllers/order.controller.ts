import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';

/**
 * @author
 * @description Create an order
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const createOrder = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get all orders
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const getAllOrders = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description get an order by id
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const getOrderById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Get an order by supplier id
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const getOrdersBySupplier = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Get orders  by user
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const getOrdersByUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Update order status
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const updateOrderStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})

/**
 * @author
 * @description Delete an order
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const deleteOrder = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
})