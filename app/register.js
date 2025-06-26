import { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        bio: '',
        photoURL: null,
        followers: 0,
        following: 0,
        createdAt: serverTimestamp(),
      });
      router.replace('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Register</Text>
      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      <TextInput
        className="border w-full p-2 mb-2 rounded"
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        className="border w-full p-2 mb-2 rounded"
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        className="border w-full p-2 mb-4 rounded"
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Register" onPress={handleRegister} />
      <TouchableOpacity onPress={() => router.push('/login')} className="mt-4">
        <Text className="text-blue-500">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
