import express from "express";
import {
	createOrder,
	getAllOrders,
	getAll,
	calculateOrderDistance,
	getOrderDirections,
	getNearbyPlaces,
	getOrderById,
	updateOrderStatus,
	deleteOrder
} from "../controllers/order.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const OrderRouter = express.Router()

OrderRouter.use(MiddlewareService.protect)

OrderRouter.get('/admin/all-orders', getAll)

OrderRouter.get('/all-orders', getAllOrders)

OrderRouter.post('/distance', calculateOrderDistance)

OrderRouter.post('/directions', getOrderDirections)

OrderRouter.post('/nearby-places', getNearbyPlaces)

OrderRouter.get('/one-order/:id', getOrderById);

OrderRouter.post('/create-order', createOrder);

OrderRouter.patch('/update-order/:id', updateOrderStatus);

OrderRouter.delete('/delete-order/:id', deleteOrder)

export default OrderRouter;