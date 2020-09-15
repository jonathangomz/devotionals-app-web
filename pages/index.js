import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home({ books }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ASD Devotionals</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          ASD Devotionals
        </h1>

        <div className={styles.grid}>

          {books.map((book) => (
            <a key={book._id} href={`/book/${book._id}`} className={styles.card}>
              <h3>{book.title}</h3>
              <img alt="Book portrait" src={book.image} className={styles.image_book}></img>
            </a>
          ))}

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const token = process.env.API_TOKEN;
  const res = await fetch('https://devotionals-api.herokuapp.com/api/v1/books?exclude=devotionals&exclude=stolen_from',
  {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const books = await res.json();

  console.log(books);

  return {
    props: {
      books: books,
    },
  }
}
