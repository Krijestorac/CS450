
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { getInvitations } from '../../services/api';
import { FlatList } from 'react-native-gesture-handler';

export default function InvitationList() {

    const [invitations, setInvitations] = useState([]);

    const fetchInvitations = async () => {
        try {
            const invitationsData = await getInvitations();
            setInvitations(invitationsData);
        } catch (error) {
            console.error('Error fetching invitations:', error);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);


    return (
        <View style={styles.container}>
            <Text>List of all invitations</Text>
            <FlatList
                data={invitations}
                renderItem={({ item }) => <Text>{item.eventName}</Text>}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});