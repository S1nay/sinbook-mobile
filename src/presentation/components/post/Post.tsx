import dayjs from 'dayjs';
import { Dimensions, Pressable, Text, View } from 'react-native';

import { Colors } from '@shared/colors';
import Avatar from '@ui/avatar';
import Icon from '@ui/icon';
import ImageCarousel from '@ui/image-carousel';

import styles from './styles';
import { PostProps } from './types';

const POST_IMAGE_SIZE = Dimensions.get('screen').width;

const Post = (props: PostProps) => {
  const { post, user } = props;

  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <View style={styles.postHeaderInfo}>
          <Avatar uri={user.avatarPath} size={40} />

          <View>
            <Text style={styles.postUserNickname}>{user.nickName}</Text>
            <Text style={styles.postDateCreated}>
              {dayjs(post.createdAt).format('MMM DD, YYYY')}
            </Text>
          </View>
        </View>

        <Pressable hitSlop={8}>
          <Icon size={24} name="threeDots" stroke={Colors.black} fill={Colors.black} />
        </Pressable>
      </View>

      <Text style={styles.postContent}>{post.content}</Text>

      <ImageCarousel
        images={post.images}
        imageWidth={POST_IMAGE_SIZE}
        imageHeight={POST_IMAGE_SIZE}
      />

      <View style={styles.postActions}>
        <Pressable hitSlop={8} style={styles.postAction}>
          <Icon size={16} name="like" stroke={Colors.gray} />
          <Text style={styles.postActionText}>{post.likes.length}</Text>
        </Pressable>

        <Pressable hitSlop={8} style={styles.postAction}>
          <Icon size={16} name="comment" stroke={Colors.gray} />
          <Text style={styles.postActionText}>{post.commentsCount}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Post;
