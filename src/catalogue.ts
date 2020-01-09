import { Product } from './types';

// Catalogue Service
export interface Catalogue {
  exists(sku: string): Promise<boolean>;
  price(sku: string): Promise<number>;
}

export type CatalogueConfig = {
  products: Product[];
};

class CatalogueImpl implements Catalogue {
  private products: Map<string, Product>;
  constructor(config: CatalogueConfig) {
    this.products = new Map<string, Product>();
    for (const product of config.products) {
      this.products.set(product.sku, product);
    }
  }

  public exists = async (sku: string): Promise<boolean> => {
    // validate SKU value not being empty & in catalogue
    if (this.products.has(sku)) {
      Promise.resolve(true);
    }

    return Promise.resolve(false);
  };

  public price = async (sku: string): Promise<number> => {
    // validate SKU value not being empty & in catalogue
    if (!this.products.has(sku)) {
      Promise.reject('SKU is invalid');
    }

    return Promise.resolve(this.products.get(sku).price);
  };
}

export type NewCatalogueFn = (config: CatalogueConfig) => Catalogue;
export const NewCatalogue: NewCatalogueFn = config => {
  return new CatalogueImpl(config);
};
