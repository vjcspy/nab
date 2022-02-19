import { PatchHelper } from '@/patch/patch.helper';
import { ProductEntity } from '@entities/product.entity';
import { ProductAttributeEntity } from '@entities/product-attribute.entity';
import { ProductValueEntity } from '@entities/product-value.entity';
import { generateRandomString } from '@nab/base';

const colors = ['red', 'blue', 'white', 'green', 'orange'];
const sizes = ['X', 'S', 'L', 'XL', 'XS', 'XXL'];

const productData = Array(2000)
  .fill(0)
  .map(() => {
    return {
      name: generateRandomString(),
      sku: generateRandomString(),
      price: Math.floor(Math.random() * 1000000),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: sizes[Math.floor(Math.random() * sizes.length)],
    };
  });

export class ProductPatch extends PatchHelper {
  name = 'catalog_product_patch';

  async run(): Promise<void> {
    try {
      if (await this.isPatched()) {
        return;
      }
      for (let i = 0; i < productData.length; i++) {
        const product = await ProductEntity.save(new ProductEntity());
        const jobs: any[] = [];
        Object.entries(productData[i]).forEach(([key, value], index) => {
          jobs.push(
            new Promise<void>(async resolve => {
              const attribute = await ProductAttributeEntity.findOne({
                where: {
                  attribute_code: key,
                },
              });

              if (attribute) {
                // @ts-ignore
                await ProductValueEntity.save({
                  value: value + '',
                  attribute,
                  store_id: 0,
                  entity: product,
                });
              }
              resolve();
            }),
          );
        });

        await Promise.all(jobs);

        await this.patched();
      }
    } catch (e) {
      console.error(e);
    }

    return Promise.resolve(undefined);
  }
}
