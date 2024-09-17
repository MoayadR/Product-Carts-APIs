import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';
import { IProductRepo, IProductRepoToken } from 'src/product/interfaces/product.interface';
import { ProductValidator } from 'src/product/validators/productValidator';

@Injectable()
export class ProductService {
    constructor(
        @Inject(IProductRepoToken) private readonly productRepository:IProductRepo,
    ){}

    create(productDto:ProductValidator){
        return this.productRepository.create(productDto);
    }

    update(product:Product){
        return this.productRepository.update(product);
    }

    find(){
        return this.productRepository.find();
    }

    findOne(id:number){
        return this.productRepository.findOne(id);
    }

    delete(id:number){
        return this.productRepository.delete(id);
    }

    setProduct(product:Product , productValidator:ProductValidator){
        product.image = productValidator.image;
        product.name = productValidator.name;
        product.price = productValidator.price;
        product.quantity = productValidator.quantity;
        product.salePrice = productValidator.salePrice
    }
}
