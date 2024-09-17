import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { ProductDto } from "./product.dto"


export class ProductValidator{
    constructor(productDto:ProductDto , imageURL:string){
        this.name = productDto.name;
        this.price = Number(productDto.price);
        this.quantity = Number(productDto.quantity);
        this.image = imageURL;
        
        if (productDto.salePrice)
            this.salePrice = Number(productDto.salePrice);
    }

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumber()
    price:number

    @IsNotEmpty()
    @IsNumber()
    quantity:number

    @IsNotEmpty()
    @IsString()
    image:string

    salePrice?:number|null
}