import React from 'react';
import { StyleSheet, Text, View, Modal, Image, Alert, TouchableOpacity } from 'react-native';
import Divider from '../../components/Divider';
import { useContext } from 'react';
import { InvitationsContext } from '../../store/invitations-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InvitationDetails({ invitation, visible, onClose, onEditInvitation }) {
  const avatar = 'https://picsum.photos/150/150';
  const { sendInvitation } = useContext(InvitationsContext);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleInvitation = () => {
    onClose();
    sendInvitation(invitation, (invitedFriends) => {
      const friendsNames = invitedFriends.map(friend => friend.fullName).join(', ');
      Alert.alert(`Invitation sent to ${friendsNames}`);
    });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#6200ea" />
          </TouchableOpacity>
          <Image source={{ uri: avatar }} style={styles.image} />
          <Text style={styles.title}>{invitation.eventName}</Text>
          <Text style={styles.text}>Group: {invitation.invitedGroup.join(', ')}</Text>
          <Text style={styles.text}>Date: {formatDate(invitation.eventDate)}</Text>
          <Text style={styles.text}>Location: {invitation.eventLocation}</Text>
          <Divider />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => onEditInvitation(invitation)}>
              <Icon name="pencil" size={24} color="#fff" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleInvitation}>
              <MaterialCommunityIcons name="party-popper" size={24} color="#fff" />
              <Text style={styles.buttonText}>Invite to Party</Text>
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});
