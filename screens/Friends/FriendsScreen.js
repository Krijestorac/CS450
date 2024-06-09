import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed
import FriendsList from './FriendsList';
import Spinner from '../../components/Spinner';
import ErrorOverlay from '../../components/ErrorOverlay';
import { useContext } from 'react';
import { FriendsContext } from '../../store/friends-context';

export default function FriendsScreen() {
    
    const { friends, createFriend, loading, error } = useContext(FriendsContext);

    const handleAddFriend = () => {
        console.log('Add friend button pressed');
    };

    if (error) return <ErrorOverlay message={error} onConfirm={() => setError('') } />;

    if (loading) return <Spinner/>;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Friends</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                    <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <FriendsList friends={friends} />
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
