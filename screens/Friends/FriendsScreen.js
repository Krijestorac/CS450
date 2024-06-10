import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FriendsList from './FriendsList';
import Spinner from '../../components/Spinner';
import ErrorOverlay from '../../components/ErrorOverlay';
import { FriendsContext } from '../../store/friends-context';
import FriendForm from './FriendForm';
import { Modal } from 'react-native';
import { useState } from 'react';
import { Button } from 'react-native';

export default function FriendsScreen({ navigation }) {
    const [formVisible, setFormVisible] = useState(false);

    const { friends, loading, error } = useContext(FriendsContext);

    const handleAddFriend = () => {
        setFormVisible(true);
    };

    const handleEditFriend = (friend) => {
        navigation.navigate('FriendForm', { friend, isEditing: true });
    };

    if (error) return <ErrorOverlay message={error} onConfirm={() => { }} />;
    if (loading) return <Spinner />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Friends</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                    <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            {/* open on adding a new friend */}
            <Modal visible={formVisible} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <FriendForm
                            isEditing={false}
                            onClose={() => setFormVisible(false)}
                        />
                        <Button title="Cancel" onPress={() => setFormVisible(false)} color="#6200ea" />
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        height: '80%',
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
