import { Entity as EntityOrm, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { SetupPatch } from '@interfaces/setup-patch.interface';

@EntityOrm()
export class SetupPatchEntity extends BaseEntity implements SetupPatch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patch: string;
}
