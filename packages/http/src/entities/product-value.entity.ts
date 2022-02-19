import { Entity as EntityOrm, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { ProductAttributeEntity } from './product-attribute.entity';
import { ProductEntity } from './product.entity';
import { ProductValue } from '@interfaces/product-value.interface';

@EntityOrm()
export class ProductValueEntity extends BaseEntity implements ProductValue {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  value: string;

  @Column()
  store_id: number;

  @ManyToOne(() => ProductAttributeEntity, attribute => attribute.values)
  attribute?: ProductAttributeEntity;

  @ManyToOne(() => ProductEntity, entity => entity.values)
  entity?: ProductEntity;
}
