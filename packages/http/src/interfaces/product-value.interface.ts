import { ProductAttributeEntity } from '@entities/product-attribute.entity';
import { ProductEntity } from '@entities/product.entity';

export interface ProductValue {
  id?: number;

  value: string;

  store_id: number;

  attribute?: ProductAttributeEntity;

  entity?: ProductEntity;
}
