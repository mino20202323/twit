import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function CreatePostScreen() {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handlePost = async () => {
    if (!content.trim()) return;
    await addDoc(collection(db, 'posts'), {
      userId: user.uid,
      authorName: user.displayName,
      content,
      createdAt: serverTimestamp(),
    });
    setContent('');
    router.back();
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <TextInput
        className="border rounded p-2 mb-2"
        placeholder="What's on your mind?"
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}
