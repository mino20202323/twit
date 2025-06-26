import { View, Text, Image } from 'react-native';

export default function ProfileHeader({ user }) {
  return (
    <View className="items-center p-4 bg-white border-b">
      {user.photoURL && (
        <Image
          source={{ uri: user.photoURL }}
          className="w-24 h-24 rounded-full mb-2"
        />
      )}
      <Text className="text-xl font-bold">{user.name}</Text>
      {user.bio ? <Text className="text-gray-600">{user.bio}</Text> : null}
      <View className="flex-row mt-2">
        <Text className="mr-4">Followers: {user.followers}</Text>
        <Text>Following: {user.following}</Text>
      </View>
    </View>
  );
}
