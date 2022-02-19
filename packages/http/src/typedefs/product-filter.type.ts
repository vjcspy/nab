import { Field, InputType } from 'type-graphql';

@InputType()
export class ProductFilterType {
  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  size?: string;

  @Field({ nullable: true })
  sku?: string;

  @Field({ nullable: true })
  name?: string;
}
