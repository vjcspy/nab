import { ProductValueEntity } from '@entities/product-value.entity';

export interface Product {
  id: number;
  values?: ProductValueEntity[];
}
