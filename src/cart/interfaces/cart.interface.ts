import { Cart } from "../entities/cart.entity";

export const ICartRepoToken = Symbol("ICartRepoToken");

export interface ICartRepository{
    create():Promise<Cart>;

    find():Promise<Cart[]>
    findOne(id:number):Promise<Cart>

}