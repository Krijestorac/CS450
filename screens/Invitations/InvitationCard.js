import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import InvitationDetails from './InvitationDetails';

export default function InvitationCard({ invitation }) {
  const [visible, setVisible] = useState(false);

  const onPress = () => setVisible(true);
  const onClose = () => setVisible(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Pressable onPress={onPress} style={styles.pressable}>
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.title}>{invitation.eventName}</Text>
          <Text style={styles.subtitle}>{formatDate(invitation.eventDate)}</Text>
          <Text style={styles.group}>{invitation.invitedGroup.join(', ')}</Text>
        </View>
      </View>
      <InvitationDetails invitation={invitation} visible={visible} onClose={onClose} />
    </Pressable>
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
});
