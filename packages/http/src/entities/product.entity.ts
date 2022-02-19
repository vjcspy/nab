import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductValueEntity } from './product-value.entity';

@Entity()
export class ProductEntity extends BaseEntity {
  static ENTITY_CODE = 'catalog_product';
  @PrimaryGeneratedColumn()
  id?: number;

  @OneToMany(() => ProductValueEntity, value => value.entity)
  values?: ProductValueEntity[];
}
