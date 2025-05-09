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
 * @description Get directions between two locations
 * @route `/api/v1/order/distance`
 * @access Public
 * @type POST
 */
export const calculateOrderDistance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return next(new AppError("Origin and destination are required", ResponseHelper.BAD_REQUEST));
        }

        const distance = await OrderService.calculateOrderDistance(origin, destination);

        if (distance === null) {
            return next(new AppError("Unable to calculate distance", ResponseHelper.INTERNAL_SERVER_ERROR));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Distance calculated successfully",
            data: { distance },
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        logger.error("Error calculating distance:", error);
        return next(new AppError("An error occurred while calculating distance. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
    }
});

/**
 * @description Get directions between two locations
 * @route `/api/v1/order/directions`
 * @access Public
 * @type POST
 */
export const getOrderDirections = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { origin, destination } = req.body;

        if (!origin || !destination) {
            return next(new AppError("Origin and destination are required", ResponseHelper.BAD_REQUEST));
        }

        const directions = await OrderService.getOrderDirections(origin, destination);

        if (!directions) {
            return next(new AppError("Unable to fetch directions", ResponseHelper.INTERNAL_SERVER_ERROR));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Directions fetched successfully",
            data: directions,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        logger.error("Error fetching directions:", error);
        return next(new AppError("An error occurred while fetching directions. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
    }
});

/**
 * @description Get nearby places around a location
 * @route `/api/v1/order/nearby-places`
 * @access Public
 * @type POST
 */
export const getNearbyPlaces = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { location, radius, type } = req.body;

        if (!location || !radius || !type) {
            return next(new AppError("Location, radius, and type are required", ResponseHelper.BAD_REQUEST));
        }

        const nearbyPlaces = await OrderService.getNearbyPlaces(location, radius, type);

        if (!nearbyPlaces) {
            return next(new AppError("Unable to fetch nearby places", ResponseHelper.INTERNAL_SERVER_ERROR));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Nearby places fetched successfully",
            data: nearbyPlaces,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        logger.error("Error fetching nearby places:", error);
        return next(new AppError("An error occurred while fetching nearby places. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR));
    }
});


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