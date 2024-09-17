import { Inject, Injectable } from '@nestjs/common';
import { CartProduct } from 'src/cart/entities/cart-product';
import { Cart } from 'src/cart/entities/cart.entity';
import { ICartProductRepository, ICartProductRepoToken } from 'src/cart/interfaces/cart-product.interface';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartProductService {
    constructor(
        @Inject(ICartProductRepoToken) private readonly cartProductRepository:ICartProductRepository
    ){}

    create(product:Product ,cart:Cart , quantity:number){
        return this.cartProductRepository.create(product , cart , quantity);
    }

    delete(id:number){
        return this.cartProductRepository.delete(id);
    }

    update(cartProduct:CartProduct){
        return this.cartProductRepository.update(cartProduct);
    }

    findAllByCart(cart:Cart){
        return this.cartProductRepository.findAllByCart(cart);
    }
}
