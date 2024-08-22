import { ReactNode, useEffect, useState } from 'react';

import { get } from './util/http';
import BlogPosts, { BlogPost } from './components/BlogPosts';
import fetchingImg from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage';

type RowDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[] | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
        const data = (await get(
          'https://jsonplaceholder.typicode.com/postssdfsdf'
        )) as RowDataBlogPost[];

        const blogPosts: BlogPost[] = data.map((rowPost) => {
          return {
            id: rowPost.id,
            userId: rowPost.userId,
            title: rowPost.title,
            text: rowPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        // setError('Failed to fetch posts!');
      }

      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error} />;
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = <p id='loading-fallback'>Fetching posts...</p>;
  }

  return (
    <main>
      <img src={fetchingImg} alt='An abstract image depicting a data fetching process.' />
      {content}
    </main>
  );
}

export default App;
