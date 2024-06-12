import React from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native';
import Divider from '../../components/Divider';
import Icon from 'react-native-vector-icons/Ionicons';

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
            <TouchableOpacity style={styles.button} onPress={() => onEditFriend(friend)}>
              <Icon name="pencil" size={24} color="#fff" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better focus
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    width: '50%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});
