import Head from 'next/head';
import styles from '../../styles/Home.module.css';

export default function Book({ book }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ASD Devotionals | Book</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="/" className={styles.return}>return</a>
        <h1 className={styles.title}>
          {book.title}
        </h1>

        <div className={styles.grid}>

          {book.devotionals.map((devotional) => (
            <a key={devotional._id} href={`/book/${book._id}/${devotional._id}`} className={styles.card}>
              <h3>{devotional.title}</h3>
              <p>{devotional.date}</p>
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

export async function getStaticPaths() {
  const token = process.env.API_TOKEN;
  const res = await fetch(`https://devotionals-api.herokuapp.com/api/v1/books`,
  {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const books = await res.json();

  const paths = books.map((book) => `/book/${book._id}`);

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const token = process.env.API_TOKEN;
  const res = await fetch(`https://devotionals-api.herokuapp.com/api/v1/books/${params.id}`, 
  {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const book = await res.json();

  console.log(book);

  return {
    props: {
      book,
    },
  }
}
