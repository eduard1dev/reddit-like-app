export type Post = {
  kind: string;
  data: {
    title: string;
    author: string;
    thumbnail: string;
    num_comments: number;
    score: number;
    created_utc: number;
    permalink: string;
  };
};

export type PostList = {
  data: {
    children: Post[];
    after: string;
  };
};

export default async (sort: string, after: string): Promise<PostList> => {
  const response: any | {error: number} = await fetch(
    `https://api.reddit.com/r/pics/${sort}.json?after=${after}`,
    {
      cache: 'no-store',
    },
  );

  const data = await response.json();

  if (data.error) {
    throw new Error('Failed to fetch posts');
  }

  return data;
};
