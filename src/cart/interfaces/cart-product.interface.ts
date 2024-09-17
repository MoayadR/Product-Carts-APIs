import { Product } from "src/product/entities/product.entity";
import { CartProduct as CartProduct } from "../entities/cart-product";
import { Cart } from "../entities/cart.entity";
import { DeleteResult } from "typeorm";

export const ICartProductRepoToken = Symbol("ICartProductstoken");
export interface ICartProductRepository{

    create(product:Product , cart:Cart , quantity:number):Promise<CartProduct>

    delete(id:number):Promise<DeleteResult>

    update(cartProduct:CartProduct):Promise<CartProduct>

    findAllByCart(cart:Cart):Promise<CartProduct[]>

    findAllByCartJoinProduct(cart:Cart):Promise<CartProduct[]>

    findOneByCartAndProduct(cart:Cart , product:Product):Promise<CartProduct>
}