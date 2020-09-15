import Head from 'next/head';
import styles from '../../styles/Home.module.css';

class ContentComponent extends React.Component {
  static async getInitialProps() {
    const text = '<div class=""></div>';
    return { text };
  }

  render() {
    return (
      <div>
        <div className="text-container" dangerouslySetInnerHTML={{ __html: this.props.text }} />
        <h1>Hello world</h1>
      </div>
    );
  }
}

export default function Devotionals({ devotional, bookId }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ASD Devotionals | Devotional</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href={`/book/${bookId}`} className={styles.return}>return</a>
        <h1 className={styles.title}>
          {devotional.title}
        </h1>
        <p>{devotional.date}</p>

        <div className={styles.grid} style={{marginTop:0}}>
          <p className={styles.vers}>{devotional.vers}</p>
          {devotional.content.map((paragraph) => (
            <p style={{
              textAlign:"justify",
            }}>{paragraph}</p>
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

  const paths = [];
  
  books.forEach((book) => {
    const relative_paths = book.devotionals.map((devotional) => `/book/${book._id}/${devotional._id}`);
    paths.push(...relative_paths);
  });

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const token = process.env.API_TOKEN;
  const [bookId, id] = params.slug;
  const res = await fetch(`https://devotionals-api.herokuapp.com/api/v1/books/${bookId}/devotionals/${id}`, 
  {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const devotional = await res.json();
  
  return {
    props: {
      devotional,
      bookId,
    }
  }
}