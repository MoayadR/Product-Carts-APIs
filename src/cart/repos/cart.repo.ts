import { DeleteResult, Repository } from "typeorm";
import { Cart } from "../entities/cart.entity";
import { ICartRepository } from "../interfaces/cart.interface";
import { InjectRepository } from "@nestjs/typeorm";

export class CartRepository implements ICartRepository {
    constructor(
        @InjectRepository(Cart) private readonly cartRepository:Repository<Cart>
    ){}

    create(): Promise<Cart> {
        const cart = this.cartRepository.create();
        return this.cartRepository.save(cart);
    }

    find(): Promise<Cart[]> {
        return this.cartRepository.find();
    }

    findOne(id: number): Promise<Cart> {
        return this.cartRepository.findOne({where:{id:id}});
    }

    delete(id: number): Promise<DeleteResult> {
        return this.cartRepository.delete(id);
    }

}