'use client';
import Link from 'next/link';
import { Product } from '../../product-data';
import Image from 'next/image';
import { useState } from 'react';

interface ProductsListProps {
  products: Product[];
  initialCartProducts: Product[];
}

export default function ProductsList({ products, initialCartProducts }: ProductsListProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>(initialCartProducts);

  const modifyCart = async (productId: string, method: 'POST' | 'DELETE') => {
    const addToCartResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/2/cart`, {
      method: method,
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedCartProducts: Product[] = await addToCartResponse.json();
    setCartProducts(updatedCartProducts);
  };

  const productIsInCart = (productId: string) => cartProducts.find((p) => p.id === productId);

  return (
    <div className='flex flex-wrap gap-4'>
      {products.map((product) => (
        <Link key={product.id} className='w-[300px] shadow-xl border border-sky-400 hover:border-sky-600 p-4 space-y-2' href={`/products/${product.id}`}>
          <Image src={product.imageUrl} alt={product.name} width={300} height={300} />
          <p className='font-bold'>{product.name}</p>
          <p>${product.price}</p>
          <button
            className='bg-sky-800 text-white rounded-md p-2 cursor-pointer'
            onClick={(e) => {
              e.preventDefault();
              modifyCart(product.id, productIsInCart(product.id) ? 'DELETE' : 'POST');
            }}
          >
            {productIsInCart(product.id) ? 'Remove from cart' : 'Add to cart'}
          </button>
        </Link>
      ))}
    </div>
  );
}
