import { Module } from '@nestjs/common';
import { CartService } from './services/cart/cart.service';
import { CartController } from './controllers/cart/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cart])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
