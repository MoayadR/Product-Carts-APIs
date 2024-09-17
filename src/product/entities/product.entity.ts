import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    name:string

    @Column({nullable:false})
    price:number

    @Column({nullable:false})
    image:string

    @Column({nullable:false})
    quantity:number

    @Column({name:"sale_price" ,nullable:true})
    salePrice:number
}