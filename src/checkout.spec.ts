import { Catalogue, NewCatalogue } from './catalogue';
import { Checkout, NewCheckout } from './checkout';
import { Deal, DealType, Product } from './types';

describe('Checkout Service Tests', () => {
  let catalogue: Catalogue;
  let deals: Deal[];
  let checkout: Checkout;

  beforeAll(() => {
    const products: Product[] = [
      {
        sku: 'ipd',
        name: 'Super iPad',
        price: 549.99,
      },
      {
        sku: 'mbp',
        name: 'MacBook Pro',
        price: 1399.99,
      },
      {
        sku: 'atv',
        name: 'Apple TV',
        price: 109.5,
      },
      {
        sku: 'vga',
        name: 'VGA adapter',
        price: 30.0,
      },
    ];

    catalogue = NewCatalogue({
      products,
    });

    deals = [
      {
        Name: '3 for 2 deal on Apple TVs',
        DealType: DealType.Free,
        SKU: 'atv',
        Quantity: 3,
        FreeSKU: 'atv',
        FreeQuantity: 1,
      },
      {
        Name: 'VGA adapter free of charge with every MacBook Pro sold',
        DealType: DealType.Free,
        SKU: 'mbp',
        Quantity: 1,
        FreeSKU: 'vga',
        FreeQuantity: 1,
      },
      {
        Name: 'Bulk discount for 4 or more Super iPads',
        DealType: DealType.BulkDiscount,
        SKU: 'ipd',
        Quantity: 4,
        DiscountPrice: 499.99,
      },
    ];
  });

  beforeEach(() => {
    checkout = NewCheckout({
      catalogue,
      deals,
    });
  });

  // Assert Example scenario 1
  it('SKUs Scanned: atv, atv, atv, vga Total expected: $249.00', async () => {
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('atv');
    checkout.scan('vga');
    const total = await checkout.total();
    expect(total).toBe(249.0);
  });

  // Assert Example scenario 2
  it('SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95', async () => {
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('atv');
    checkout.scan('ipd');
    checkout.scan('ipd');
    checkout.scan('ipd');
    const total = await checkout.total();
    expect(total).toBe(2718.95);
  });

  // Assert Example scenario 3
  it('SKUs Scanned: mbp, vga, ipd Total expected: $1949.98', async () => {
    checkout.scan('mbp');
    checkout.scan('vga');
    checkout.scan('ipd');
    const total = await checkout.total();
    expect(total).toBe(1949.98);
  });
});
