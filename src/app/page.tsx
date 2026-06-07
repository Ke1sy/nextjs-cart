import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home Page</h1>
        <Link className='text-[blue] underline' href={'/products'}>
          See products
        </Link>
      </main>
    </div>
  );
}
