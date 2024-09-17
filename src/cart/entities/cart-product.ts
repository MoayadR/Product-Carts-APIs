import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class CartProduct{
    
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=> Cart)
    cart:Cart

    @ManyToOne(()=> Product)
    product:Product

    @Column({nullable:false})
    quantity:number
}