import { useState, useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import { collection, deleteDoc, doc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function LikeButton({ postId }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const likesCol = collection(db, 'posts', postId, 'likes');
    const unsubscribe = onSnapshot(likesCol, (snap) => {
      setCount(snap.size);
      setLiked(!!snap.docs.find((d) => d.id === user.uid));
    });
    return unsubscribe;
  }, [postId, user.uid]);

  const toggleLike = async () => {
    const likeRef = doc(db, 'posts', postId, 'likes', user.uid);
    if (liked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, { createdAt: serverTimestamp() });
    }
  };

  return (
    <Pressable onPress={toggleLike} className="py-1">
      <Text className={liked ? 'text-blue-500' : ''}>Like ({count})</Text>
    </Pressable>
  );
}
