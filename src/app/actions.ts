'use server';
import { revalidatePath } from 'next/cache';

export async function updateCart(productId: string, method: 'POST' | 'DELETE', page: string) {
  await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users/2/cart`, {
    method: method,
    body: JSON.stringify({ productId }),
    headers: { 'Content-Type': 'application/json' },
  });

  revalidatePath(page);
}
