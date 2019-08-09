import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import api from '../services/api';
import itsamatch from '../assets/itsamatch.png';

export default function Main({ navigation }) {
  const id = navigation.getParam('user');
  const [users, setUsers] = useState([]);
  const [matchDev, setMatchDev] = useState(null);
  useEffect(() => {
    const loadUser = async () => {
      await api
        .get('/devs', {
          headers: {
            user: id,
          },
        })
        .then(res => {
          if (res.status === 200) {
            setUsers(res.data);
          }
        });
    };
    loadUser();
  }, [id]);

  useEffect(() => {
    const socket = io('http://192.168.0.165:3333', {
      query: { user: id },
    });

    socket.on('match', dev => {
      setMatchDev(dev);
    });
  }, [id]);

  const handleLike = async () => {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id },
    });

    setUsers(rest);
  };

  const handleDislike = async () => {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id },
    });

    setUsers(rest);
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={{ margin: 30 }} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', maxHeight: 500 }}>
        {users.length === 0 ? (
          <Text style={{ alignSelf: 'center', color: '#999', fontSize: 24, fontWeight: 'bold' }}>
            Acabou :(
          </Text>
        ) : (
          users.map((user, index) => (
            <View
              key={user._id}
              style={{
                borderWidth: 1,
                borderColor: '#DDD',
                borderRadius: 8,
                margin: 30,
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: users.length - index,
              }}
            >
              <Image style={{ flex: 1, height: 300 }} source={{ uri: user.avatar }} />
              <View style={{ backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{user.name}</Text>
                <Text
                  numberOfLines={3}
                  style={{ fontSize: 14, color: '#999', marginTop: 2, lineHeight: 20 }}
                >
                  {user.bio}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
      {users.length > 0 && (
        <View style={{ flexDirection: 'row', marginBottom: 30 }}>
          <TouchableOpacity
            onPress={handleDislike}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
              elevation: 2,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 2,
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}
          >
            <Image source={dislike} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLike}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 20,
              elevation: 2,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 2,
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}
          >
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}

      {matchDev && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={itsamatch} style={{ height: 80, resizeMode: 'contain' }} />
          <Image
            source={{ uri: matchDev.avatar }}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              borderWidth: 5,
              borderColor: '#fff',
              marginVertical: 30,
            }}
          />
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fff' }}>{matchDev.name}</Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 24,
              textAlign: 'center',
              paddingHorizontal: 30,
            }}
          >
            {matchDev.bio}
          </Text>

          <TouchableOpacity onPress={() => setMatchDev(null)}>
            <Text
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center',
                marginTop: 30,
                fontWeight: 'bold',
              }}
            >
              FECHAR
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
