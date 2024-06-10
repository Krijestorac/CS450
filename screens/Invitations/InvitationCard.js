import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import InvitationDetails from './InvitationDetails';
import { Button } from 'react-native';
import InvitationForm from './InvitationForm';


export default function InvitationCard({ invitation, onEditInvitation }) {

  const [editVisible, setEditVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const handleEdit = (invitation) => {
    setDetailsVisible(false);
    setEditVisible(true);
  };

  const handleCloseEdit = () => {
    setEditVisible(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Pressable onPress={() => setDetailsVisible(true)} style={styles.pressable}>
        <View style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.title}>{invitation.eventName}</Text>
            <Text style={styles.subtitle}>{formatDate(invitation.eventDate)}</Text>
            <Text style={styles.group}>{invitation.invitedGroup.join(', ')}</Text>
          </View>
        </View>
      </Pressable>
      <InvitationDetails
        invitation={invitation}
        visible={detailsVisible}
        onClose={() => setDetailsVisible(false)}
        onEditInvitation={() => handleEdit(invitation)} />
      <Modal visible={editVisible} trasparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <InvitationForm
              invitation={invitation}
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
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: 150,
  },
  info: {
    flexDirection: 'column',
    marginLeft: 15,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: '#6200ea',
    marginBottom: 5,
  },
  group: {
    fontSize: 14,
    color: '#999',
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
