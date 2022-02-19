import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ReturnProductType {
  @Field()
  id: number;

  @Field()
  color: string;

  @Field()
  sku: string;

  @Field()
  size: string;

  @Field()
  name: string;
}
