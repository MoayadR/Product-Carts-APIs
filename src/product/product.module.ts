import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './services/product/product.service';
import { ProductController } from './controller/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { IProductRepoToken } from './interfaces/product.interface';
import { ProductRepository } from './repos/product.repo';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports:[TypeOrmModule.forFeature([Product]) , forwardRef(()=>CartModule)],
  providers: [ProductService , {provide:IProductRepoToken , useClass:ProductRepository}],
  controllers: [ProductController],
  exports:[ProductService , {provide:IProductRepoToken , useClass:ProductRepository}],
})
export class ProductModule {}
