import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useContext, useState } from 'react';
import { FriendsContext } from '../../store/friends-context';

export default function FriendForm({ route, navigation }) {
    const { createFriend, updateFriend, friends } = useContext(FriendsContext);
    const { friend = null, isEditing = false } = route.params || { };

    const [fullName, setFullName] = useState(friend ? friend.fullName : '');
    const [hobbies, setHobbies] = useState(friend ? friend.hobbies.join(', ') : '');
    const [jobPosition, setJobPosition] = useState(friend ? friend.jobPosition : '');
    const [gender, setGender] = useState(friend ? friend.gender : '');
    const [contact, setContact] = useState(friend ? friend.contact : '');
    const [address, setAddress] = useState(friend ? friend.address : '');

    const generateNewId = () => {
        if (friends.length === 0) return 1;
        const maxId = Math.max(...friends.map(f => parseInt(f.id, 10)));
        return maxId + 1;
    };

    const handleSubmit = () => {
        const friendData = {
            id: friend ? friend.id : generateNewId().toString(),
            fullName,
            hobbies: hobbies.split(','),
            jobPosition,
            gender,
            contact,
            address,
        };
        if (isEditing) {
            updateFriend(friendData);
        } else {
            createFriend(friendData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isEditing ? 'Edit Friend' : 'Add New Friend'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Hobbies (comma separated)"
                value={hobbies}
                onChangeText={setHobbies}
            />
            <TextInput
                style={styles.input}
                placeholder="Job Position"
                value={jobPosition}
                onChangeText={setJobPosition}
            />
            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />
            <TextInput
                style={styles.input}
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            <Button title={isEditing ? 'Update Friend' : 'Add Friend'} onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
});
