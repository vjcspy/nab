import { SetupPatch } from '@interfaces/setup-patch.interface';
import { Field } from 'type-graphql';
import { IsString } from 'class-validator';

export class CreateSetupPatchDto implements Partial<SetupPatch> {
  @Field()
  @IsString()
  patch: string;
}
