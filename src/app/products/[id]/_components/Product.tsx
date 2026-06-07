'use client';
import { Product } from '@/app/product-data';
import { updateCart } from '@/app/actions';
import Image from 'next/image';

interface ProductProps {
  product: Product;
  productIsInCart: boolean;
}

export const ProductItem = ({ product, productIsInCart }: ProductProps) => {
  const modifyCart = async () => {
    await updateCart(product.id, !productIsInCart ? 'POST' : 'DELETE', `/products/${product.id}`);
  };

  return (
    <div className='flex gap-4'>
      <Image src={product.imageUrl} alt={`Product ${product.id}`} width={500} height={400} />
      <div className='space-y-2'>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price} $</p>
        <button className='bg-sky-800 text-white rounded-md p-2 cursor-pointer' onClick={() => modifyCart()}>
          {productIsInCart ? 'Remove from cart' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};
