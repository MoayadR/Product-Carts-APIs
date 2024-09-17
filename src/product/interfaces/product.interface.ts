import { DeleteResult } from "typeorm";
import { Product } from "../entities/product.entity";
import { ProductValidator } from "../validators/productValidator";

export const IProductRepoToken = Symbol("IProductRepoToken");

export interface IProductRepo{
    create(productDto:ProductValidator):Promise<Product>

    delete(id:number):Promise<DeleteResult>

    find():Promise<Product[]>

    findOne(id:number):Promise<Product>

    update(product:Product):Promise<Product>
}