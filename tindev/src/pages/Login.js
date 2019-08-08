import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import api from '../services/api';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  const handleLogin = async () => {
    const response = await api.post('/devs', { username: user });
    const { _id } = response.data;
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', { user: _id });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
      }}
    >
      <Image source={logo} style={{ marginBottom: 20 }} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        backgroundColor="#fff"
        style={{
          alignSelf: 'stretch',
          height: 46,
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 4,
          paddingHorizontal: 15,
        }}
        value={user}
        onChangeText={setUser}
      />
      <TouchableOpacity
        style={{
          height: 46,
          alignSelf: 'stretch',
          backgroundColor: '#DF4723',
          borderRadius: 4,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
