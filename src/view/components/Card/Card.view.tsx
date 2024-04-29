import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import moment from 'moment';
import {Post} from '../../../services/posts/fetchPosts';
import {colors, spacing, typography} from '../../../lib/styles';

type CardProps = {
  post: Post;
};

const Card = ({post}: CardProps) => {
  const getRelativeTime = useCallback((utcTime: number) => {
    const now = moment();
    const utcDate = moment.unix(utcTime);
    return utcDate.from(now);
  }, []);

  const handleOnPressCard = useCallback(() => {
    Linking.openURL(`https://www.reddit.com${post.data.permalink}`);
  }, []);

  return (
    <TouchableOpacity
      onPress={handleOnPressCard}
      style={styles.container}
      testID="card">
      <View>
        {!!post.data.thumbnail && post.data.thumbnail.includes('https') && (
          <Image
            accessibilityHint="thumbnail-image"
            source={{uri: post.data.thumbnail}}
            style={styles.thumbnail}
          />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {post.data.title}
        </Text>
        <Text style={styles.author}>Author: {post.data.author}</Text>
        <Text style={styles.score}>Score: {post.data.score}</Text>
        <Text style={styles.comments}>Comments: {post.data.num_comments}</Text>
        <Text style={styles.createdAt}>
          {getRelativeTime(post.data.created_utc)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginBottom: spacing.medium,
    gap: spacing.medium,
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: typography.large,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  author: {
    fontSize: typography.medium,
    marginBottom: spacing.verySmall,
  },
  score: {
    fontSize: typography.medium,
    marginBottom: spacing.verySmall,
  },
  comments: {
    fontSize: typography.medium,
    marginBottom: spacing.verySmall,
  },
  createdAt: {
    fontSize: typography.medium,
  },
  descriptionContainer: {
    flex: 1,
  },
});

export default Card;
