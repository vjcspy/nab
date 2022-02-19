import { EntityRepository } from 'typeorm';
import { ProductEntity } from '@entities/product.entity';
import { ProductFilterType } from '@typedefs/product-filter.type';

@EntityRepository()
export default class ProductRepository {
  public async findAll(filterType: ProductFilterType, pageSize: number): Promise<any[]> {
    let products = await ProductEntity.find({
      relations: ['values.attribute', 'values'],
    });
    // TODO: refactor on sql left join
    const { color, sku, size } = filterType;
    products = products.filter(product => {
      const valueArr = product.values.map(value => {
        return value.value;
      });

      return (
        (typeof color !== 'undefined' ? valueArr.includes(color) : true) &&
        (typeof sku !== 'undefined' ? valueArr.includes(sku) : true) &&
        (typeof size !== 'undefined' ? valueArr.includes(size) : true)
      );
    });
    return products.slice(0, pageSize).map(product => {
      return {
        id: product.id,
        name: attributeValue('name', product.values),
        sku: attributeValue('sku', product.values),
        color: attributeValue('color', product.values),
        size: attributeValue('size', product.values),
      };
    });
  }
}

function attributeValue(code: string, values: any[]) {
  const value = values.find(value => value.attribute.attribute_code == code);

  return value?.value;
}
