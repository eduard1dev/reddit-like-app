import * as React from 'react';
import {render, screen} from '../../../lib/test-utils';
import PostListScreen from './PostListScreen.view';
import {PostList} from '../../../services/posts/fetchPosts';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

afterEach(() => {
  jest.resetAllMocks();
});

describe('post list screen', () => {
  it('should show post list in the first screen', async () => {
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(
        new Response(JSON.stringify({data: {children: mockList}})),
      );

    const Tab = createMaterialTopTabNavigator();

    render(
      <Tab.Navigator>
        <Tab.Screen name="Hot" component={PostListScreen} />
      </Tab.Navigator>,
      {},
    );

    const postList = await screen.findByTestId('post-list');

    expect(postList).toBeVisible();

    expect(fetchMock).toHaveBeenCalledTimes(1);

    const cards = await screen.findAllByTestId('card');

    expect(cards).toHaveLength(2);
  });
});

const mockList: PostList = {
  data: {
    after: 'foo',
    children: [
      {
        kind: 't3',
        data: {
          title: 'Post 1',
          author: 'Author 1',
          thumbnail: 'https://foo.com/foo1.jpg',
          num_comments: 10,
          score: 100,
          created_utc: 1610000000,
          permalink: '/r/foo/comments/12345/foo_title/',
        },
      },
      {
        kind: 't3',
        data: {
          title: 'Post 2',
          author: 'Author 2',
          thumbnail: 'https://foo.com/foo2.jpg',
          num_comments: 20,
          score: 200,
          created_utc: 1610000000,
          permalink: '/r/foo/comments/12345/foo_title/',
        },
      },
    ],
  },
};
