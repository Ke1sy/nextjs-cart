import { NextRequest } from 'next/server';
import { connectToDb } from '@/app/api/db';

type Params = {
  id: string;
};

export async function GET(request: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  const { db } = await connectToDb();
  const userCart = await db.collection('carts').findOne({ userId: id });

  if (!userCart) {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { cartIds } = userCart;
  const shoppingCartProducts = await db
    .collection('products')
    .find({ id: { $in: cartIds } })
    .toArray();

  return new Response(JSON.stringify(shoppingCartProducts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

type CardBody = {
  productId: string;
};

export async function DELETE(request: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const { db } = await connectToDb();

  const body: CardBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection('carts').findOneAndUpdate({ userId: id }, { $pull: { cartIds: productId } }, { returnDocument: 'after' });

  if (!updatedCart) {
    return new Response(JSON.stringify([]), {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const shoppingCartProducts = await db
    .collection('products')
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  return new Response(JSON.stringify(shoppingCartProducts), {
    status: 202,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const { db } = await connectToDb();

  const body: CardBody = await request.json();
  const productId = body.productId;

  const updatedCart = await db.collection('carts').findOneAndUpdate({ userId: id }, { $push: { cartIds: productId } }, { upsert: true, returnDocument: 'after' });

  const shoppingCartProducts = await db
    .collection('products')
    .find({ id: { $in: updatedCart.cartIds } })
    .toArray();

  return new Response(JSON.stringify(shoppingCartProducts), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
