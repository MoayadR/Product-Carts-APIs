import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartProduct } from "./cart-product";

@Entity()
export class Cart{
    @PrimaryGeneratedColumn()
    id:number 

    @OneToMany(()=>CartProduct , cartProduct=>cartProduct.cart)
    cartProducts:CartProduct[]
}