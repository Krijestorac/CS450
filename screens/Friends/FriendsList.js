import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import FriendsCard from './FriendsCard';

export default function FriendsList({ friends, onEditFriend }) {


  return (
    <FlatList
      data={friends}
      keyExtractor={friend => friend.id.toString()}
      renderItem={itemData => <FriendsCard friend={itemData.item} onEditFriend={onEditFriend} />}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
  },
});
