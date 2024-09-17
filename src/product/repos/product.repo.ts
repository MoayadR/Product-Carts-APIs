import { DeleteResult, Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { IProductRepo } from "../interfaces/product.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductValidator } from "../dtos/productValidator";

export class ProductRepository implements IProductRepo{
    constructor(
        @InjectRepository(Product) private readonly productRepository:Repository<Product>
    ){}

    create(productDto: ProductValidator, imageURL: string): Promise<Product> {
        const product = this.productRepository.create(productDto);
        product.image = imageURL;
        return this.productRepository.save(product);
    }

    delete(product: Product): Promise<DeleteResult> {
        return this.productRepository.delete(product);
    }

    find(): Promise<Product[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productRepository.findOne({where:{id:id}});
    }

    update(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

}