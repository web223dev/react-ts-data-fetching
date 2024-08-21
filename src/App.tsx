import { ReactNode, useEffect, useState } from 'react';

import { get } from './util/http';
import BlogPosts, { BlogPost } from './components/BlogPosts';
import fetchingImg from './assets/data-fetching.png';

type RowDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[] | undefined>();

  useEffect(() => {
    async function fetchPosts() {
      const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RowDataBlogPost[];

      const blogPosts: BlogPost[] = data.map((rowPost) => {
        return {
          id: rowPost.id,
          userId: rowPost.userId,
          title: rowPost.title,
          text: rowPost.body,
        };
      });

      setFetchedPosts(blogPosts);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt='An abstract image depicting a data fetching process.' />
      {content}
    </main>
  );
}

export default App;
