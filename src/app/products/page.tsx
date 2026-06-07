import { Product } from '../product-data';
import ProductsList from './_components/ProductsList';

export const dynamic = 'force-dynamic';

export default async function Products() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`);
  const productsData: Product[] = await response.json();

  const cartResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/2/cart`, { cache: 'no-cache' });
  const cartProducts: Product[] = await cartResponse.json();

  return (
    <div>
      <h1>Products</h1>
      <ProductsList products={productsData} initialCartProducts={cartProducts} />
    </div>
  );
}
