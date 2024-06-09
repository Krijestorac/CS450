import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FriendsList from './FriendsList';
import Spinner from '../../components/Spinner';
import ErrorOverlay from '../../components/ErrorOverlay';
import { FriendsContext } from '../../store/friends-context';

export default function FriendsScreen({ navigation }) {
    const { friends, loading, error } = useContext(FriendsContext);

    const handleAddFriend = () => {
        navigation.navigate('FriendForm', { isEditing: false });
    };

    const handleEditFriend = (friend) => {
        navigation.navigate('FriendForm', { friend, isEditing: true });
    };

    if (error) return <ErrorOverlay message={error} onConfirm={() => {}} />;
    if (loading) return <Spinner />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Friends</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                    <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <FriendsList friends={friends} onEditFriend={handleEditFriend} />
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
