import { Product } from "src/product/entities/product.entity";
import { DeleteResult, Repository } from "typeorm";
import { CartProduct as CartProduct } from "../entities/cart-product";
import { Cart } from "../entities/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ICartProductRepository } from "../interfaces/cart-product.interface";

export class CartProductsRepository implements ICartProductRepository{
    constructor(
       @InjectRepository(CartProduct) private readonly cartProductsRepository:Repository<CartProduct> 
    ){}

    findAllByProduct(product: Product): Promise<CartProduct[]> {
        return this.cartProductsRepository.find({where:{product:product}});
    }

    findAllByCartJoinProduct(cart: Cart): Promise<CartProduct[]> {
        return this.cartProductsRepository.find({where:{cart:cart} , relations:{product:true}});
    }

    findOneByCartAndProduct(cart: Cart, product: Product): Promise<CartProduct> {
        return this.cartProductsRepository.findOne({where:{cart:cart , product:product}});
    }

    findAllByCart(cart: Cart): Promise<CartProduct[]> {
        return this.cartProductsRepository.find({where:{cart:cart}});
    }

    update(cartProduct: CartProduct): Promise<CartProduct> {
        return this.cartProductsRepository.save(cartProduct);
    }

    create(product: Product, cart: Cart, quantity: number): Promise<CartProduct> {
        const cartProduct = this.cartProductsRepository.create();
        cartProduct.quantity = quantity;
        cartProduct.cart = cart;
        cartProduct.product = product;

        return this.cartProductsRepository.save(cartProduct);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.cartProductsRepository.delete(id);
    }

}