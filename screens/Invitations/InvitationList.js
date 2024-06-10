
import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import InvitationCard from './InvitationCard';


export default function InvitationList({ invitations, onEditInvitation }) {
  return (
    <FlatList
      data={invitations}
      keyExtractor={invitation => invitation.id.toString()}
      renderItem={itemData => <InvitationCard invitation={itemData.item} onEditInvitation={onEditInvitation} />}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
  },
});
