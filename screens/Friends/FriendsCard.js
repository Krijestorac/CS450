import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FriendsDetails from './FriendsDetails';

export default function FriendsCard({ friend }) {
  const avatar = `https://randomuser.me/api/portraits/men/${friend.id}.jpg`;
  const [visible, setVisible] = useState(false);
  const onPress = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <View style={styles.card}>
        <Image source={{ uri: avatar }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{friend.fullName}</Text>
          <Text style={styles.subtitle}>{friend.jobPosition}</Text>
          <Text style={styles.contact}>{friend.contact}</Text>
        </View>
      </View>
      <FriendsDetails friend={friend} visible={visible} onClose={onClose} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  info: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  contact: {
    fontSize: 14,
    color: '#999',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
