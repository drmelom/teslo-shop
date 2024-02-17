import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: 'uuid',
    description: 'This is the id of the product',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'Product title',
    description: 'This is the title of the product',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  title: string;
  @ApiProperty({ example: 0, description: 'This is the price of the product' })
  @Column('float', {
    default: 0,
  })
  price: number;
  @ApiProperty({ example: 'This is a product description', nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @ApiProperty({
    example: 'product-slug',
    description: 'This is the slug of the product',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;
  @ApiProperty({ example: 0, description: 'This is the stock of the product' })
  @Column('int', {
    default: 0,
  })
  stock: number;
  @ApiProperty({ example: 'This is a product category' })
  @Column('text', {
    array: true,
  })
  sizes: string[];
  @ApiProperty()
  @Column('text')
  gender: string;
  @ApiProperty({ example: 'This is a product category' })
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];
  @ApiProperty({ example: 'This is a product category' })
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;
  @BeforeInsert()
  chekSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
  @BeforeUpdate()
  chekSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll("'", '');
  }
}
