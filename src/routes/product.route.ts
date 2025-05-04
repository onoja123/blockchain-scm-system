import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getAllByUser,
	getProductById,
	updateProduct
} from "../controllers/product.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const ProductRouter = express.Router()

ProductRouter.use(MiddlewareService.protect)

ProductRouter.get('/admin/all-Products', getAllProducts)

ProductRouter.get('/all-Products', getAllByUser)

ProductRouter.get('/one-Product/:id', getProductById);

ProductRouter.post('/create-Product', createProduct);

ProductRouter.patch('/update-product/:id', updateProduct);

ProductRouter.delete('/delete-product/:id', deleteProduct)

export default ProductRouter;