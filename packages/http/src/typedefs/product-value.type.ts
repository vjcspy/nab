import { Field, ObjectType } from 'type-graphql';
import { ProductAttribute } from '@typedefs/product-attribute.type';

@ObjectType()
export class ProductValue {
  @Field()
  id: number;

  @Field()
  value: string;

  @Field()
  store_id: number;

  @Field(() => ProductAttribute)
  attribute: ProductAttribute;
}
