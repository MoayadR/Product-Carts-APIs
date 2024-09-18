import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, } from '@nestjs/common';
import { shippingFee, taxRate } from 'src/cart/constants/taxes';
import { QuantityDto } from 'src/cart/dtos/quantity.dto';
import { CartProductService } from 'src/cart/services/cart-product/cart-product.service';
import { CartService } from 'src/cart/services/cart/cart.service';
import { ProductService } from 'src/product/services/product/product.service';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService:CartService,
        private readonly cartProductService:CartProductService,
        private readonly productService:ProductService
    ){}

    @Post('')
    async create(){
        const cart = await this.cartService.find();
        if (cart.length) throw new BadRequestException("Only one instance of the cart can be created!");

        return await this.cartService.create();
    }

    @Get('')
    async find(){
        return await this.cartService.find();
    }

    @Post('products/:productID')
    async addProductToCart(@Param('productID' , ParseIntPipe) productID:number , @Body() quantityDto:QuantityDto){
        if (quantityDto.quantity <=0) throw new BadRequestException("Quantity cannot be less than or equal to zero");

        const cartList = await this.cartService.find(); // getting the only cart 
        if(!cartList.length) throw new NotFoundException("The Cart Doesn't Exist!");
        
        const cart = cartList[0];

        const cartItems = await this.cartProductService.findAllByCartJoinProduct(cart);
        
        // if the product is already in the cart then just modify the quantity
        const existingCartProduct = cartItems.find((item) => item.product.id == productID);
        if (existingCartProduct){
            existingCartProduct.quantity += quantityDto.quantity;
            await this.cartProductService.update(existingCartProduct);
            return await this.cartProductService.findAllByCartJoinProduct(cart);
        }

        const product = await this.productService.findOne(productID);
        if(!product) throw new NotFoundException("The Product Doesn't Exist!");

        await this.cartProductService.create(product , cart , quantityDto.quantity);

        return await this.cartProductService.findAllByCartJoinProduct(cart);
    }

    @Put('products/:productID')
    async updateProductQuantity(@Param('productID' , ParseIntPipe) productID:number , @Body() quantityDto:QuantityDto){
        if (quantityDto.quantity <=0) throw new BadRequestException("Quantity cannot be less than or equal to zero");

        const cartList = await this.cartService.find(); // getting the only cart 
        if(!cartList.length) throw new NotFoundException("The Cart Doesn't Exist!");
        
        const cart = cartList[0];

        const cartItems = await this.cartProductService.findAllByCartJoinProduct(cart);

        const existingCartProduct = cartItems.find((item) => item.product.id == productID);
        if(!existingCartProduct) throw new NotFoundException("The Product is not in the Cart!");

        existingCartProduct.quantity = quantityDto.quantity; // here it's and update not addition
        await this.cartProductService.update(existingCartProduct);

        return await this.cartProductService.findAllByCartJoinProduct(cart);
    }

    @Delete('products/:productID')
    async deleteProductFromCart(@Param('productID' , ParseIntPipe) productID:number){
        const cartList = await this.cartService.find(); // getting the only cart 
        if(!cartList.length) throw new NotFoundException("The Cart Doesn't Exist!");
        
        const cart = cartList[0];

        const product = await this.productService.findOne(productID);
        if(!product) throw new NotFoundException("The Product Doesn't Exist!");

        const cartProductItem = await this.cartProductService.findOneByCartAndProduct(cart , product);
        
        if(!cartProductItem) throw new NotFoundException("The Product is not in the Cart!");

        return this.cartProductService.delete(cartProductItem.id);
    }

    @Get('products')
    async getCartProductsInCart(){
        const cartList = await this.cartService.find();
        if(!cartList.length) throw new NotFoundException("The Cart Doesn't Exist!");

        const cart = cartList[0];

        return await this.cartProductService.findAllByCartJoinProduct(cart);
    }

    @Get('pricing')
    async getPricing(){

        const cartList = await this.cartService.find();
        if(!cartList.length) throw new NotFoundException("The Cart Doesn't Exist!");

        const cart = cartList[0];
        const cartItems = await this.cartProductService.findAllByCartJoinProduct(cart);
        
        
        let subtotal = 0;
        cartItems.forEach((item)=>{
            const price = item.product.salePrice || item.product.price;
            
            subtotal += (price * item.quantity);
        })

        const taxAmount = subtotal * taxRate;

        const total = subtotal + taxAmount + shippingFee;

        return {
            "Subtotal":subtotal,
            "Total": total
        }
    }
}
