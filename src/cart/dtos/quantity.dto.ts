import { IsInt, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class QuantityDto{

    @IsNotEmpty()
    @IsNumber()
    @IsInt()
    @IsPositive()
    quantity:number
}