import { Product } from '../product-data';
import CartProductsList from './_components/CartProductsList';

export const dynamic = 'force-dynamic';

export default async function Cart() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/2/cart`, { cache: 'no-cache' });
  const products: Product[] = await response.json();

  return (
    <div>
      <h1>Cart</h1>
      <CartProductsList initialProducts={products} />
    </div>
  );
}
