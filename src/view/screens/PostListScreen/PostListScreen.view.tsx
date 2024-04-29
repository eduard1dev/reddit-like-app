import React from 'react';
import {FlatList, Alert, ActivityIndicator, StyleSheet} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import Card from '../../components/Card/Card.view';
import fetchPosts, {Post} from '../../../services/posts/fetchPosts';
import {useRoute} from '@react-navigation/native';
import {spacing} from '../../../lib/styles';

export default function PostListScreen() {
  const {name} = useRoute();

  const {
    error,
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`posts-${name.toLowerCase()}`],
    queryFn: ({pageParam = ''}) => fetchPosts(name.toLowerCase(), pageParam),
    initialPageParam: '',
    getNextPageParam: lastPage => lastPage?.data?.after,
  });

  if (isLoading)
    <ActivityIndicator
      animating
      size="small"
      style={styles.activityIndicator}
    />;

  if (isError) {
    Alert.alert(error.name, error.message);
  }

  const renderPost = ({item}: {item: Post}) => <Card post={item} />;

  return (
    <FlatList
      data={data?.pages?.flatMap(page => page?.data?.children)}
      keyExtractor={(_, index) => String(index)}
      renderItem={renderPost}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      testID="post-list"
      onRefresh={refetch}
      refreshing={isFetching}
    />
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: spacing.medium,
  },
});
