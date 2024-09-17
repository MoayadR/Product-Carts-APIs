import { Module } from '@nestjs/common';
import { CartService } from './services/cart/cart.service';
import { CartController } from './controllers/cart/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartProduct } from './entities/cart-product';
import { ICartRepoToken } from './interfaces/cart.interface';
import { CartRepository } from './repos/cart.repo';
import { CartProductsRepository } from './repos/cart-product.repo';
import { CartProductService } from './services/cart-product/cart-product.service';
import { ICartProductRepoToken } from './interfaces/cart-product.interface';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cart , CartProduct]) , ProductModule],
  providers: [
    CartService ,
    {provide:ICartRepoToken , useClass:CartRepository},
    {provide:ICartProductRepoToken , useClass:CartProductsRepository},
    CartProductService,
  ],
  controllers: [CartController]
})
export class CartModule {}
