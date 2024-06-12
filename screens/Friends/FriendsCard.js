import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FriendsDetails from './FriendsDetails';
import FriendForm from './FriendForm';
import Icon from 'react-native-vector-icons/Ionicons';

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
            <Text style={styles.contact}>
              {friend.invitations && friend.invitations.length > 0
                ? `Invited to: ${friend.invitations.join(', ')}`
                : 'No invitations'}
            </Text>
          </View>
        </View>
      </Pressable>
      <FriendsDetails
        friend={friend}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        onEditFriend={handleEdit}
      />
      <Modal visible={editVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FriendForm friend={friend} isEditing={true} onClose={handleCloseEdit} />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseEdit}>
              <Icon name="close" size={24} color="#fff" />
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 5,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  info: {
    flexDirection: 'column',
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  contact: {
    fontSize: 14,
    color: '#6200ea',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 10,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});
