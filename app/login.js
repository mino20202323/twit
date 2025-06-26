import { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { router, Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-2xl font-bold mb-4">Login</Text>
      {error && <Text className="text-red-500 mb-2">{error}</Text>}
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
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => router.push('/register')} className="mt-4">
        <Text className="text-blue-500">Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
