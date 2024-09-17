import { Inject, Injectable } from '@nestjs/common';
import { ProductValidator } from 'src/product/dtos/productValidator';
import { Product } from 'src/product/entities/product.entity';
import { IProductRepo, IProductRepoToken } from 'src/product/interfaces/product.interface';

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
}
