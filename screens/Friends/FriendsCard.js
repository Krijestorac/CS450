import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import FriendsDetails from './FriendsDetails';
import FriendForm from './FriendForm';


export default function FriendsCard({ friend, onEditFriend }) {

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const handleEdit = (friend) => {
    setDetailsVisible(false);
    setEditVisible(true);
  };

  const handleCloseEdit = () => {
    setEditVisible(false);
  };


  return (
    <>
      <Pressable onPress={() => setDetailsVisible(true)} style={styles.pressable}>
        <View style={styles.card}>
          <Image source={{ uri: friend.avatar }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{friend.fullName}</Text>
            <Text style={styles.subtitle}>{friend.jobPosition}</Text>
            <Text style={styles.contact}>{friend.contact}</Text>
          </View>
        </View>
      </Pressable>
      <FriendsDetails
        friend={friend}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        onEditFriend={handleEdit} />
      <Modal visible={editVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FriendForm
              friend={friend}
              isEditing={true}
              onClose={handleCloseEdit}
            />
            <Button title="Close" onPress={handleCloseEdit} color="#6200ea" />
          </View>
        </View>
      </Modal>
    </>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
