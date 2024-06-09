import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { getInvitations } from '../../services/api';
import { useEffect, useState } from 'react';
import ErrorOverlay from '../../components/ErrorOverlay';
import Spinner from '../../components/Spinner';
import InvitationList from './InvitationList';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { InvitationsContext } from '../../store/invitations-context';

export default function InvitationScreen() {

    const { invitations, isLoading, error } = useContext(InvitationsContext);

    const handleAddInvitation = () => {
        console.log('Add invitation button pressed');
    };

    if (error) return <ErrorOverlay message={error} onConfirm={() => setError('')} />;
    if (isLoading) return <Spinner />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Invitations</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddInvitation}>
                    <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <InvitationList invitations={invitations} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginTop: 50,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6200ea',
    },
    addButton: {
        backgroundColor: '#6200ea',
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
