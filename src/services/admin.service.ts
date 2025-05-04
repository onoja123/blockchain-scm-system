import { Iuser } from "../types/interfaces/user.inter";
import User from "../models/user.model";

export default class AdminService{
    static async getAll(): Promise<Iuser[]>{
        const users =  await User.find()
        .populate("product")
        .populate("order")
        .populate("inventory")
        return users
    }

    static async getOne(userId: string): Promise<Iuser | null>{
        const user = await User.findById(userId)
        .populate("product")
        .populate("order")
        .populate("inventory")
        return user
    }

    static async createUser(id: string, data: Iuser): Promise<Iuser | null> {
        const user = await User.findById(id);

        if (!user) {
          return null;
        }

        const newUser = await User.create({
          ...data,
          isActive: true,
          _user: id,
        });

        await newUser.save();

        return newUser;
      }

    static async updateUser(id: string, data: Iuser): Promise<Iuser | null> {
        const updatedUser = await User.findByIdAndUpdate(id, data,{new: true});
        return updatedUser;
    }

    static async deleteUser(id: string): Promise<Iuser | null> {
        const deletedUser = await User.findByIdAndDelete(id, {new: true});
        return deletedUser;
    }
}