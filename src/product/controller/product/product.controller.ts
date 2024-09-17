import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseFilePipeBuilder, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductDto } from 'src/product/dtos/product.dto';
import { ProductService } from 'src/product/services/product/product.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'; // for unique file naming
import * as path from 'path';
import { IMAGE_MAX_SIZE, imageEndpoint } from 'src/product/constants/image';
import { ProductValidator } from 'src/product/validators/productValidator';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService:ProductService
    ){}

    @Post('')
    @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // Path where images will be stored
      filename: (req, file, callback) => {
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = `${uuidv4()}${fileExtension}`; // Generate unique file name
        callback(null, fileName); // Save file with this name
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) { // Accept only JPEG and PNG files
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    }
  }))
    async create(@Body() productDto:ProductDto , @UploadedFile(
        new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg' })
        .addMaxSizeValidator({maxSize: IMAGE_MAX_SIZE})
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    ) imageFile:Express.Multer.File){


        const imageURL = `${imageEndpoint}uploads/${imageFile.filename}`;
        const productValidator = new ProductValidator(productDto , imageURL);

        if (!productValidator.isValid())
            throw new BadRequestException();

        // Create the product
        const product = await this.productService.create(productValidator);

        return product
    }

    @Get('')
    async find(){
        return await this.productService.find();
    }
    
    @Put(':id')
    @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // Path where images will be stored
      filename: (req, file, callback) => {
        const fileExtension = path.extname(file.originalname); // Get file extension
        const fileName = `${uuidv4()}${fileExtension}`; // Generate unique file name
        callback(null, fileName); // Save file with this name
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) { // Accept only JPEG and PNG files
        return callback(new Error('Only image files are allowed!'), false);
      }
      callback(null, true);
    }
  }))
    async update(@Param('id', ParseIntPipe) id:number , @Body() productDto:ProductDto , @UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({
                maxSize: IMAGE_MAX_SIZE
                }),
                new FileTypeValidator({
                fileType: 'image/jpeg' 
                })
            ]
            ,
            fileIsRequired:false,
        })
    ) imageFile?:Express.Multer.File){
        
        const product =  await this.productService.findOne(id);

        if(!product) throw new NotFoundException("Product Doesn't Exist");

        let imageURL = product.image;

        if(imageFile){
            imageURL = `${imageEndpoint}uploads/${imageFile.filename}`;
        }

        const productValidator = new ProductValidator(productDto , imageURL);

        if (!productValidator.isValid())
            throw new BadRequestException();

        this.productService.setProduct(product , productValidator);

        return await this.productService.update(product);
    }

    @Delete(':id')
    async delete(@Param('id' , ParseIntPipe) id:number ){
        
        const product = await this.productService.findOne(id);

        if(!product) throw new NotFoundException("Product Doesn't Exist");

        return await this.productService.delete(id)
    }
}
