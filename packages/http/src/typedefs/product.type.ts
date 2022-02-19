import { Field, ObjectType } from 'type-graphql';
import { ProductValue } from '@typedefs/product-value.type';

@ObjectType()
export class Product {
  @Field()
  id: number;

  @Field(type => [ProductValue])
  values: ProductValue[];
}
