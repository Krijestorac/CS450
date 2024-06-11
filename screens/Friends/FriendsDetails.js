import React from 'react';
import { StyleSheet, Text, View, Modal, Image, Button } from 'react-native';
import Divider from '../../components/Divider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FriendsDetails({ friend, visible, onClose, onEditFriend }) {

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#6200ea" />
          </TouchableOpacity>
          <Image source={{ uri: friend.avatar }} style={styles.image} />
          <Text style={styles.title}>{friend.fullName}</Text>
          <Text style={styles.text}>Hobbies: {friend.hobbies.join(', ')}</Text>
          <Text style={styles.text}>Email: {friend.contact}</Text>
          <Text style={styles.text}>Gender: {friend.gender}</Text>
          <Text style={styles.text}>Address: {friend.address}</Text>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={() => onEditFriend(friend)} color="#6200ea" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
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
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
});
