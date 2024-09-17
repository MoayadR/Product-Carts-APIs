import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"
import { ProductDto } from "../dtos/product.dto";


export class ProductValidator{
    constructor(productDto:ProductDto , imageURL:string){
        this.name = productDto.name;
        this.price = Number(productDto.price);
        this.image = imageURL;
        
        if (productDto.salePrice)
        {
            this.salePrice = Number(productDto.salePrice);
        }
        else{
            this.salePrice = null;
        }
    }

    isValid(){
        if (this.price < 0)
            return false;
        if (this.salePrice && this.salePrice < 0)
            return false;

        return true;
    }

    @IsNotEmpty()
    @IsString()
    name:string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price:number

    @IsNotEmpty()
    @IsString()
    image:string

    salePrice?:number|null
}