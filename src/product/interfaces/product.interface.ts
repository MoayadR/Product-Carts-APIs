import { DeleteResult } from "typeorm";
import { Product } from "../entities/product.entity";
import { ProductValidator } from "../dtos/productValidator";

export const IProductRepoToken = Symbol("IProductRepoToken");

export interface IProductRepo{
    create(productDto:ProductValidator , imageURL:string):Promise<Product>

    delete(product:Product):Promise<DeleteResult>

    find():Promise<Product[]>

    findOne(id:number):Promise<Product>

    update(product:Product):Promise<Product>
}