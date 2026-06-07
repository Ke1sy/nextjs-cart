import NotFoundPage from '@/app/not-found';
import { Product } from '@/app/product-data';
import { ProductItem } from './_components/Product';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`, { cache: 'no-cache' });
  const product: Product = await response.json();

  const cartResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/2/cart`, { cache: 'no-cache' });
  const cartProducts: Product[] = await cartResponse.json();

  const productIsInCart = cartProducts.find((p) => p.id === id);

  if (!product) {
    return <NotFoundPage />;
  }

  return <ProductItem product={product} productIsInCart={!!productIsInCart} />;
}
