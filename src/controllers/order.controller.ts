import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import OrderService from '../services/order.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';
import logger from '../utils/logger';

/**
 * @author
 * @description Create an order
 * @route `/api/v1/order/`
 * @access Public
 * @type POST
 */
export const createOrder = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const order = await OrderService.createOrder(req.user?.id, req.body);

        if(!order) {
            return next(new AppError("Order not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
			message: "Order created successfully",
            data: order,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        logger.info("Error occurred", error)
        return next(new AppError("An error occurred while trying to get all orders. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get all orders(Admin)
 * @route `/api/v1/order/`
 * @access Public
 * @type GET
 */
export const getAll = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const orders = await OrderService.getAll();

        if(!orders || orders.length === 0) {
            return next(new AppError("Order not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: orders,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to create an orders. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get all orders
 * @route `/api/v1/order/`
 * @access Public
 * @type GET
 */
export const getAllOrders = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const orders = await OrderService.getAllOrders(req.user?.id);

        if(!orders || orders.length === 0) {
            return next(new AppError("Order not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: orders,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to create an orders. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description get an order by id
 * @route `/api/v1/order/`
 * @access Public
 * @type GET
 */
export const getOrderById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const orders = await OrderService.getOrderById(req.params.id);

        if(!orders) {
            return next(new AppError("Order not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: orders,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get one order. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})


/**
 * @author
 * @description Update order status
 * @route `/api/v1/order/`
 * @access Public
 * @type PATCH
 */
export const updateOrderStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const orders = await OrderService.updateOrder(req.params.id, req.body);

        if(!orders) {
            return next(new AppError("Order not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
			message: "Order updated successfully",
            data: orders,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all orders. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description Delete an order
 * @route `/api/v1/order/`
 * @access Public
 * @type DELETE
 */
export const deleteOrder = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const orders = await OrderService.deleteOrder(req.params.id);

        if(!orders) {
            return next(new AppError("Order not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
			message: "Order deleted successfully",
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to delete an order. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})