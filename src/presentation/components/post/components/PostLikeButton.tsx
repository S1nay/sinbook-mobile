import { observer } from 'mobx-react-lite';
import { Pressable, Text } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import Icon from '@ui/icon';

import styles from '../styles';
import { PostLikeButtonProps } from '../types';

// Отдельный observer: изменение likes перерисовывает только кнопку, а не весь пост с каруселью
const PostLikeButton = observer(function PostLikeButton(props: PostLikeButtonProps) {
  const { post, currentUserId, onLike } = props;
  const { theme } = useUnistyles();

  const isLiked = currentUserId !== null ? post.likes.includes(currentUserId) : false;

  return (
    <Pressable hitSlop={8} style={styles.postAction} onPress={() => onLike(post.id)}>
      <Icon
        size={16}
        name="like"
        stroke={theme.colors.foreground.secondary}
        fill={isLiked ? theme.colors.foreground.secondary : 'none'}
      />
      <Text style={styles.postActionText}>{post.likes.length}</Text>
    </Pressable>
  );
});

export default PostLikeButton;
