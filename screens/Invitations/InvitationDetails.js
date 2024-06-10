import React from 'react';
import { StyleSheet, Text, View, Modal, Image, Button } from 'react-native';
import Divider from '../../components/Divider';

export default function InvitationDetails({ invitation, visible, onClose, onEditInvitation }) {

  const avatar = 'https://picsum.photos/150/150';

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Image source={{ uri: avatar }} style={styles.image} />
          <Text style={styles.title}>{invitation.eventName}</Text>
          <Text style={styles.text}>Group: {invitation.invitedGroup.join(', ')}</Text>
          <Text style={styles.text}>Date: {formatDate(invitation.eventDate)}</Text>
          <Text style={styles.text}>Location: {invitation.eventLocation}</Text>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button title="Close" onPress={onClose} color="#6200ea" />
            <Button title="Edit" onPress={() => onEditInvitation(invitation)} color="#6200ea" />
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
