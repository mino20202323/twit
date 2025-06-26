import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ProfileHeader from '../../components/ProfileHeader';
import PostCard from '../../components/PostCard';

export default function ProfileScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const docSnap = await getDoc(doc(db, 'users', id));
      setUser({ id: docSnap.id, ...docSnap.data() });
    };
    loadUser();

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((p) => p.userId === id);
      setPosts(data);
    });
    return unsubscribe;
  }, [id]);

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ProfileHeader user={user} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}
