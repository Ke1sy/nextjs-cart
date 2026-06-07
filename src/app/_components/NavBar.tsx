import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className='bg-sky-800 text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-md font-bold'>My Store</h1>
        <div className='space-x-4'>
          <Link href='/' className='hover:underline'>
            Home
          </Link>
          <Link href='/products' className='hover:underline'>
            Products
          </Link>
          <Link href='/cart' className='hover:underline'>
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}
