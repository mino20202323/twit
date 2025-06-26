import { View, Text } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import CommentBox from './CommentBox';
import LikeButton from './LikeButton';

export default function PostCard({ post }) {
  return (
    <View className="p-4 border-b border-gray-200">
      <Text className="font-bold mb-1">{post.authorName}</Text>
      <Text>{post.content}</Text>
      <Text className="text-xs text-gray-500 mt-1">
        {formatDistanceToNow(new Date(post.createdAt))} ago
      </Text>
      <LikeButton postId={post.id} />
      <CommentBox postId={post.id} />
    </View>
  );
}
