import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsDTO } from './dto/products.dto';
import { ProductUpdateDTO } from './dto/products_update.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: ProductsDTO) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ skipMissingProperties: true, whitelist: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProductUpdateDTO) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}