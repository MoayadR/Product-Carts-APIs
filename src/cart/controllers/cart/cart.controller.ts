import { BadRequestException, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CartProductService } from 'src/cart/services/cart-product/cart-product.service';
import { CartService } from 'src/cart/services/cart/cart.service';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('carts')
export class CartController {
    constructor(
        private readonly cartService:CartService,
        private readonly cartProductService:CartProductService,
        private readonly productService:ProductService
    ){}

    @Post('')
    async create(){
        return await this.cartService.create();
    }

    @Get('')
    async find(){
        return await this.cartService.find();
    }

    @Post(':cartID/products/:productID?')
    async addProductToCart(@Param('cartID',ParseIntPipe) cartID:number , @Param('productID' , ParseIntPipe) productID:number , @Query('quantity' , ParseIntPipe) quantity){
        if (quantity <=0) throw new BadRequestException("Quantity cannot be less than or equal to zero");

        const cart = await this.cartService.findOne(cartID);
        if(!cart) throw new NotFoundException("The Cart Doesn't Exist!");

        const cartItems = await this.cartProductService.findAllByCart(cart);
        
        // if the product is already in the cart then just modify the quantity
        const existingCartProduct = cartItems.find((p) => p.id == productID);
        if (existingCartProduct){
            existingCartProduct.quantity += quantity;
            await this.cartProductService.update(existingCartProduct);
            return await this.cartProductService.findAllByCart(cart);
        }

        const product = await this.productService.findOne(productID);
        if(!product) throw new NotFoundException("The Product Doesn't Exist!");

        await this.cartProductService.create(product , cart , quantity);

        return await this.cartProductService.findAllByCart(cart);
    }

    @Post(':cartID/products/:productID?')
    async updateProductQuantity(@Param('cartID',ParseIntPipe) cartID:number , @Param('productID' , ParseIntPipe) productID:number , @Query('quantity' , ParseIntPipe) quantity){
        if (quantity <=0) throw new BadRequestException("Quantity cannot be less than or equal to zero");

        const cart = await this.cartService.findOne(cartID);
        if(!cart) throw new NotFoundException("The Cart Doesn't Exist!");

        const cartItems = await this.cartProductService.findAllByCart(cart);

        const existingCartProduct = cartItems.find((p) => p.id == productID);
        if(!existingCartProduct) throw new NotFoundException("The Product is not in the Cart!");

        existingCartProduct.quantity = quantity; // here it's and update not addition
        await this.cartProductService.update(existingCartProduct);

        return await this.cartProductService.findAllByCart(cart);
    }
}
