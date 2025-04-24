import Product from "../models/product.model";
import User from "../models/user.model";
import { Iproduct } from "../types/interfaces/product.inter";
import { ProductStatus } from "../types/enums/product";

export default class ProductService {

    static async getAll(): Promise<Iproduct[]> {
        const products = await Product.find()
        .populate('category')
        return products;
    }

    static async getAllByUser(userId: string): Promise<Iproduct[]> {
        const products = await Product.find({ user: userId })
        .populate('category');

        return products;
    }

    static async getTotalCount(): Promise<number> {
        const totalCount = await Product.countDocuments()
        return totalCount;
    }

    static async getTotalInStockCount(): Promise<number> {
        const inStockCount = await Product.countDocuments({ 'status': ProductStatus.inStock });
        return inStockCount;
    }

    static async getTotalOutOfStockCount(): Promise<number> {
        const outOfStockCount = await Product.countDocuments({ 'status': ProductStatus.outOfStock });
        return outOfStockCount;
    }

    static async getProductById(id: string): Promise<Iproduct | null> {
        const product = await Product.findById(id)
        .populate('category')
        return product;
    }

    static async createProduct(userId: string, data: Iproduct): Promise<Iproduct | null> {
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newProduct = await Product.create({
          ...data,
          user: userId,
        });

        await newProduct.save();

        return newProduct;
      }

    static async updateProduct(id: string, product: any): Promise<Iproduct | null> {
        const updatedProduct = await Product.findByIdAndUpdate(id, product,{new: true});
        return updatedProduct;
    }

    static async deleteProduct(id: string): Promise<Iproduct | null> {
        const product = await Product.findById(id);

        if (!product) {
        throw new Error('Product not found');
        }
        const deleteProduct = await Product.findByIdAndDelete(id, {new: true});
        return deleteProduct;
    }
}