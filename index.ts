// Example scenarios
import { NewCatalogue } from './src/catalogue';
import { Deal, DealType } from './src/types';
import { NewCheckout } from './src/checkout';

(async () => {
  let items = [
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
  const catalogue = NewCatalogue({
    products: items,
  });

  const deals: Deal[] = [
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

  let c = NewCheckout({
    catalogue,
    deals,
  });

  // SKUs Scanned: atv, atv, atv, vga Total expected: $249.00
  c.scan('atv');
  c.scan('atv');
  c.scan('atv');
  c.scan('vga');
  console.log(await c.total());

  c = NewCheckout({
    catalogue,
    deals,
  });
  // SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd Total expected: $2718.95
  c.scan('atv');
  c.scan('ipd');
  c.scan('ipd');
  c.scan('atv');
  c.scan('ipd');
  c.scan('ipd');
  c.scan('ipd');
  console.log(await c.total());

  c = NewCheckout({
    catalogue,
    deals,
  });
  // SKUs Scanned: mbp, vga, ipd Total expected: $1949.98
  c.scan('mbp');
  c.scan('vga');
  c.scan('ipd');
  console.log(await c.total());
})();
