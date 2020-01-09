import { Catalogue } from './catalogue';
import { Deal, DealType } from './types';

// Checkout interface exposed to clients
export interface Checkout {
  // function to scan SKUs
  scan(sku: string): Promise<void>;

  // function to calculate cart total
  total(): Promise<string>;
}

export type CheckoutConfig = {
  catalogue: Catalogue;
  deals: Deal[];
};

// an implementation of CheckoutImpl that clients can't directly use
// but through NewCheckout function provided below. Happy to discuss this.
class CheckoutImpl implements Checkout {
  private cart: Map<string, number>;
  private catalogue: Catalogue;
  // NOTE: not externalizing this & keeping it one-deal-per-sku for simplicity
  private deals: Map<string, Deal>;

  constructor(config: CheckoutConfig) {
    if (!config || !config.catalogue || !config.deals) {
      throw 'invalid configuration';
    }

    this.cart = new Map<string, number>();
    this.catalogue = config.catalogue;
    this.deals = new Map<string, Deal>();

    for (const deal of config.deals) {
      this.deals.set(deal.SKU, deal);
    }
  }

  public scan = async (sku: string): Promise<void> => {
    // validate SKU value not being empty
    if (!sku) {
      return Promise.reject('SKU is empty');
    }

    // validate SKU in catalogue
    const exists = this.catalogue.exists(sku);
    if (!exists) {
      return Promise.reject('SKU is invalid');
    }

    // update cart
    const existing = this.cart.get(sku) || 0;
    this.cart.set(sku, existing + 1);

    return Promise.resolve();
  };

  public total = async (): Promise<string> => {
    const costs: number[] = await Promise.all(
      Array.from(this.cart, async ([sku, quantity]) => {
        const skuPrice = await this.catalogue.price(sku);

        if (this.deals.has(sku)) {
          const deal = this.deals.get(sku);

          switch (deal.DealType) {
            case DealType.BulkDiscount:
              if (quantity >= deal.Quantity) {
                return quantity * deal.DiscountPrice;
              }
              break;
            case DealType.Free:
              if (quantity >= deal.Quantity && this.cart.has(deal.FreeSKU)) {
                // take the cost off free item/s if it exists
                const freeSKUPrice = await this.catalogue.price(deal.FreeSKU);

                // (deal.FreeQuantity * quantity/deal.Quantity) accounts for multiples of discounted items
                return (
                  quantity * skuPrice -
                  ((deal.FreeQuantity * quantity) / deal.Quantity) *
                    freeSKUPrice
                );
              }
              break;
          }
        }

        return quantity * skuPrice;
      }),
    );

    const totalCost = costs.reduce((total: number, lineItemCost) => {
      return total + lineItemCost;
    });

    return Promise.resolve(`$${totalCost.toFixed(2)}`);
  };
}

export type NewCheckoutFn = (config: CheckoutConfig) => Checkout;
export const NewCheckout: NewCheckoutFn = config => {
  return new CheckoutImpl(config);
};
