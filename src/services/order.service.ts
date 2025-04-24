import { Iorder } from "../types/interfaces/order.inter";
import Order from "../models/order.model";
export default class OrderService {

  static async getAllOrders(userId: string): Promise<Iorder[]> {
    return Order.find({ _orderedBy: userId }).populate("_orderedBy");
  }

  static async createOrder(userId: string, data: Iorder): Promise<Iorder | null> {
    const newOrder = await Order.create({
      ...data,
      _orderedBy: userId,
    });

    await newOrder.save();
    return newOrder;
  }

  static async getOrderById(id: string): Promise<Iorder | null> {
    return Order.findById(id).populate("_orderedBy");
  }

  static async updateOrder(id: string, data: Partial<Iorder>): Promise<Iorder | null> {
    return Order.findByIdAndUpdate(id, data, { new: true }).populate("_orderedBy");
  }
  static async deleteOrder(id: string): Promise<Iorder | null> {
    return Order.findByIdAndDelete(id);
  }

}
