import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function CommentBox({ postId }) {
  const { user } = useAuth();
  const [text, setText] = useState('');

  const handleComment = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      userId: user.uid,
      authorName: user.displayName,
      text,
      createdAt: serverTimestamp(),
    });
    setText('');
  };

  return (
    <View className="mt-2">
      <TextInput
        className="border rounded p-2 mb-2"
        placeholder="Write a comment"
        value={text}
        onChangeText={setText}
      />
      <Button title="Comment" onPress={handleComment} />
    </View>
  );
}
