import { PatchHelper } from '@/patch/patch.helper';
import { ProductAttributeEntity } from '@entities/product-attribute.entity';

const CATALOG_PRODUCT_ATTRS = [
  {
    attribute_code: 'name',
    frontend_input: 'text',
  },
  {
    attribute_code: 'sku',
    frontend_input: 'text',
  },
  {
    attribute_code: 'price',
    frontend_input: 'number',
  },
  {
    attribute_code: 'color',
    frontend_input: 'text',
  },
  {
    attribute_code: 'size',
    frontend_input: 'text',
  },
];

export class CatalogPatch extends PatchHelper {
  name = 'catalog_patch';

  async run(): Promise<void> {
    try {
      if (await this.isPatched()) {
        return;
      }

      const catalogProductAttributes = CATALOG_PRODUCT_ATTRS.map(value => {
        const attr = new ProductAttributeEntity();
        attr.attribute_code = value.attribute_code;
        attr.frontend_input = value.frontend_input;
        return attr;
      });

      await ProductAttributeEntity.save(catalogProductAttributes);

      await this.patched();
    } catch (e) {
      console.error(`Patch ${this.name}`, e);
    }
  }
}
