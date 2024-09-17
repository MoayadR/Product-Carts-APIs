import { Body, Controller, Get, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from 'src/product/dtos/product.dto';
import { ProductValidator } from 'src/product/dtos/productValidator';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService:ProductService
    ){}

    @Post('')
    @UseInterceptors(FileInterceptor('image'))

    create(@Body() productDto:ProductDto , @UploadedFile(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addMaxSizeValidator({ maxSize: 4 * 1024 * 1024 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) imageFile){

        console.log(productDto);
        const productValidator = new ProductValidator(productDto);
        return productValidator
    }

    @Get('')
    async find(){
        return await this.productService.find();
    }
}
