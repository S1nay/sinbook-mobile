import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import Avatar from '@ui/avatar';
import { BottomSheetModal } from '@ui/bottom-sheet';
import Icon from '@ui/icon';
import ImageCarousel from '@ui/image-carousel';

import PostActionsSheet from './components/PostActionsSheet';
import PostLikeButton from './components/PostLikeButton';
import styles from './styles';
import { PostProps } from './types';

const POST_IMAGE_SIZE = Dimensions.get('screen').width;

const Post = (props: PostProps) => {
  const { post, currentUserId, onLike, onEdit, onDelete } = props;
  const { theme } = useUnistyles();

  const isOwner = post.user.id === currentUserId;

  const openActions = () => {
    BottomSheetModal.show({
      modal: <PostActionsSheet postId={post.id} onEdit={onEdit} onDelete={onDelete} />,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderInfo}>
          <Avatar uri={post.user.avatarPath} size={40} />

          <View>
            <Text style={styles.postUserNickname}>{post.user.nickName}</Text>
            <Text style={styles.postDateCreated}>
              {dayjs(post.createdAt).format('MMM DD, YYYY')}
            </Text>
          </View>
        </View>

        {isOwner && (
          <Pressable hitSlop={8} onPress={openActions}>
            <Icon
              size={24}
              name="threeDots"
              stroke={theme.colors.foreground.primary}
              fill={theme.colors.foreground.primary}
            />
          </Pressable>
        )}
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <ImageCarousel
        images={post.images}
        imageWidth={POST_IMAGE_SIZE}
        imageHeight={POST_IMAGE_SIZE}
      />

      <View style={styles.postActions}>
        <PostLikeButton post={post} currentUserId={currentUserId} onLike={onLike} />

        <Pressable hitSlop={8} style={styles.postAction}>
          <Icon size={16} name="comment" stroke={theme.colors.foreground.secondary} />
          <Text style={styles.postActionText}>{post.commentsCount}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default observer(Post);
