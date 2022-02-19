import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class ProductAttribute {
  @Field()
  id: number;

  @Field()
  attribute_code: string;

  @Field()
  source: string;

  @Field()
  frontend_input: string;
}
