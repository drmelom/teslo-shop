import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { Product } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;
  @Column('text')
  url: string;
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
