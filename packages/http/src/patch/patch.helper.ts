import { SetupPatchEntity } from '@entities/setup-patch.entity';

export abstract class PatchHelper {
  abstract name: string;

  protected async isPatched() {
    const patched = await SetupPatchEntity.findOne({
      where: {
        patch: this.name,
      },
    });

    return !!patched;
  }

  protected async patched() {
    // @ts-ignore
    await SetupPatchEntity.save({
      patch: this.name,
    });
  }

  public abstract run(): Promise<void>;
}
