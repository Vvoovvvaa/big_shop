import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entityes/product.entity';
import { ProductsDTO } from './dto/products.dto';
import { ProductUpdateDTO } from './dto/products_update.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(dto: ProductsDTO) {
    const product = this.productRepository.create(dto);
    return await this.productRepository.save(product);
  }

  async update(id: number, dto: ProductUpdateDTO) {
    await this.productRepository.update(id, dto);
    const updated = await this.findOne(id);
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async delete(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}