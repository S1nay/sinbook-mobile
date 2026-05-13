import dayjs from 'dayjs';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { getConnectUrl } from '@core/helpers';
import Avatar from '@ui/avatar';
import Icon from '@ui/icon';
import ImageCarousel from '@ui/image-carousel';

import styles from './styles';
import { PostProps } from './types';

const POST_IMAGE_SIZE = Dimensions.get('screen').width;

const Post = (props: PostProps) => {
  const { post } = props;
  const { theme } = useUnistyles();

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

        <Pressable hitSlop={8}>
          <Icon
            size={24}
            name="threeDots"
            stroke={theme.colors.foreground.primary}
            fill={theme.colors.foreground.primary}
          />
        </Pressable>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <ImageCarousel
        images={post.images.map(url => getConnectUrl(url) ?? '')}
        imageWidth={POST_IMAGE_SIZE}
        imageHeight={POST_IMAGE_SIZE}
      />

      <View style={styles.postActions}>
        <Pressable hitSlop={8} style={styles.postAction}>
          <Icon size={16} name="like" stroke={theme.colors.foreground.secondary} />
          <Text style={styles.postActionText}>{post.likes.length}</Text>
        </Pressable>

        <Pressable hitSlop={8} style={styles.postAction}>
          <Icon size={16} name="comment" stroke={theme.colors.foreground.secondary} />
          <Text style={styles.postActionText}>{post.commentsCount}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Post;
