import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository, ICartRepoToken } from 'src/cart/interfaces/cart.interface';

@Injectable()
export class CartService {
    constructor(
        @Inject(ICartRepoToken) private readonly cartRepository:ICartRepository,
    ){}

    create(){
        return this.cartRepository.create();
    }

    find(){
        return this.cartRepository.find();
    }

    findOne(id:number){
        return this.cartRepository.findOne(id);
    }

}
