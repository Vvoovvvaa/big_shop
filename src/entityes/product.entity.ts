import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base';

@Entity('products')
export class Product extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  haveing: boolean;
}