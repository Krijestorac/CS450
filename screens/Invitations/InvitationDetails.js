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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
    width: '45%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});
