import { Arg, Query, Resolver } from 'type-graphql';
import ProductRepository from '@repositories/product.repository';
import { ProductFilterType } from '@typedefs/product-filter.type';
import { ReturnProductType } from '@typedefs/ReturnProduct.type';

@Resolver()
export class ProductResolver extends ProductRepository {
  @Query(() => [ReturnProductType], {
    description: 'Product find list',
  })
  async getProducts(
    @Arg('filterType')
    filterType: ProductFilterType,
    @Arg('pageSize')
    pageSize: number,
  ): Promise<ReturnProductType[]> {
    return await this.findAll(filterType, pageSize);
  }
}
