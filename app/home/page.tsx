// app/home/page.tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface Article {
  link: string;
  typez: string;
  title: string;
  img: string;
}

interface HomeProps {
  articles: Article[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.koranime.fun/v1/home');
  const data = await res.json();

  return {
    props: {
      articles: data.articles,
    },
  };
};

export default function Home({ articles }: HomeProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-4xl font-bold">Anime List</h1>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles.map((article) => (
          <div key={article.link} className="border p-4 rounded-lg">
            <Link href={article.link} passHref>
              <a target="_blank" className="block text-center">
                <img src={article.img} alt={article.title} className="mx-auto" />
                <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
                <p className="text-gray-600">{article.typez}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
