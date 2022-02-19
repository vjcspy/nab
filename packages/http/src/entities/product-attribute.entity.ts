import { Entity as EntityOrm, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import { ProductValueEntity } from './product-value.entity';
import { ProductAttribute } from '@interfaces/product-attribute.interface';

@EntityOrm()
export class ProductAttributeEntity extends BaseEntity implements ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  attribute_code: string;

  @Column({
    nullable: true,
  })
  source: string;

  @Column()
  frontend_input: string;

  @OneToMany(() => ProductValueEntity, value => value.attribute)
  values: ProductValueEntity[];
}
