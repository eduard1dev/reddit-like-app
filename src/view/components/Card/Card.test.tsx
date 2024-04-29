import {render} from '../../../lib/test-utils';
import {PostList} from '../../../services/posts/fetchPosts';
import Card from './Card.view';

describe('Card component', () => {
  it('renders the thumbnail image, title, author, score, comments, and relative date', () => {
    const {getByAccessibilityHint, getByText} = render(
      <Card post={mockList.data.children[0]} />,
      {},
    );

    const thumbnailImage = getByAccessibilityHint('thumbnail-image');
    expect(thumbnailImage).toHaveProp('source', {
      uri: mockList.data.children[0].data.thumbnail,
    });

    const titleElement = getByText(mockList.data.children[0].data.title);
    expect(titleElement).toBeVisible();

    const authorElement = getByText(
      `Author: ${mockList.data.children[0].data.author}`,
    );
    expect(authorElement).toBeVisible();

    const scoreElement = getByText(
      `Score: ${mockList.data.children[0].data.score}`,
    );
    expect(scoreElement).toBeVisible();

    const commentsElement = getByText(
      `Comments: ${mockList.data.children[0].data.num_comments}`,
    );
    expect(commentsElement).toBeVisible();

    const dateElement = getByText(/ago$/);
    expect(dateElement).toBeVisible();
  });

  it('renders the relative date 20 minutes ago correctly', () => {
    const {getByText} = render(<Card post={mockList.data.children[1]} />, {});

    const relativeDateElement = getByText(/ago$/);
    expect(relativeDateElement).toHaveTextContent('20 minutes ago');
  });

  it('renders the relative date a day ago correctly', () => {
    const {getByText} = render(<Card post={mockList.data.children[2]} />, {});

    const relativeDateElement = getByText(/ago$/);
    expect(relativeDateElement).toHaveTextContent('a day ago');
  });
});

const mockList: PostList = {
  data: {
    after: 'foo',
    children: [
      {
        kind: 't3',
        data: {
          thumbnail: 'https://foo.com/foo.jpg',
          title: 'foo Title',
          author: 'John Doe',
          score: 10,
          num_comments: 5,
          created_utc: Math.floor((Date.now() - 86400000) / 1000),
          permalink: '/r/foo/comments/12345/foo_title/',
        },
      },
      {
        kind: 't3',
        data: {
          thumbnail: 'https://foo.com/foo.jpg',
          title: 'foo Title',
          author: 'John Doe',
          score: 10,
          num_comments: 5,
          created_utc: Math.floor((Date.now() - 1200000) / 1000), // 20 minutes ago in UTC Unix time
          permalink: '/r/foo/comments/12345/foo_title/',
        },
      },
      {
        kind: 't3',
        data: {
          thumbnail: 'https://foo.com/foo.jpg',
          title: 'foo Title',
          author: 'John Doe',
          score: 10,
          num_comments: 5,
          created_utc: Math.floor((Date.now() - 86400000) / 1000),
          permalink: '/r/foo/comments/12345/foo_title/',
        },
      },
    ],
  },
};
