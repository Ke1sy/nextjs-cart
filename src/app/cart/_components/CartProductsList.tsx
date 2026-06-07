'use client';
import Link from 'next/link';
import { Product } from '../../product-data';
import { useState } from 'react';
import Image from 'next/image';

export default function CartProductsList({ initialProducts }: { initialProducts: Product[] }) {
  const [cartProducts, setCartProducts] = useState(initialProducts);

  // const modifyCart = async (productId: string) => {
  //   await updateCart(productId, 'DELETE', `/cart`);
  // };

  const removeFromCart = async (productId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/2/cart`, {
      method: 'DELETE',
      body: JSON.stringify({ productId }),
      headers: { 'Content-Type': 'application/json' },
    });
    const updatedCartProducts: Product[] = await res.json();

    setCartProducts(updatedCartProducts);
    if (res.ok) {
      console.log('Cart updated');
      setCartProducts(updatedCartProducts);
    } else {
      throw new Error('Error. Cart is not updated');
    }
  };

  return (
    <div className='space-y-4'>
      {cartProducts.map((product) => (
        <div className='flex gap-4 items-center' key={product.id}>
          <Link href={'/products/' + product.id}>
            <Image src={product.imageUrl} alt={`Product ${product.id}`} width={150} height={150} />
          </Link>
          <Link href={'/products/' + product.id} className='space-y-2'>
            <h2>{product.name}</h2>
            <p>{product.price} $</p>
          </Link>
          <button className='bg-sky-800 text-white rounded-md p-2 cursor-pointer' onClick={() => removeFromCart(product.id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
