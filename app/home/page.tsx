// app/home/page.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, Text, Grid } from '@nextui-org/react';

interface Article {
  link: string;
  typez: string;
  title: string;
  img: string;
}

const fetchArticles = async (): Promise<Article[]> => {
  const res = await fetch('https://api.koranime.fun/v1/home');
  const data = await res.json();
  return data.articles;
};

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const getArticles = async () => {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
    };

    getArticles();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-4xl font-bold">Anime List</h1>
      </div>

      <Grid.Container gap={2} justify="center" className="mt-8">
        {articles.map((article) => (
          <Grid xs={12} sm={6} md={4} key={article.link}>
            <Card clickable hoverable>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  objectFit="cover"
                  src={article.img}
                  width="100%"
                  height={140}
                  alt={article.title}
                />
              </Card.Body>
              <Card.Footer>
                <Link href={article.link} passHref>
                  <a target="_blank">
                    <Text b>{article.title}</Text>
                    <Text>{article.typez}</Text>
                  </a>
                </Link>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </section>
  );
};

export default Home;
