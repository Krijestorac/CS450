import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FriendsContext } from '../../store/friends-context';
import IconButton from '../../components/IconButton';

export default function FriendForm({ friend, isEditing, onClose }) {
    const { createFriend, updateFriend, deleteFriend, friends } = useContext(FriendsContext);

    const [fullName, setFullName] = useState(friend ? friend.fullName : '');
    const [hobbies, setHobbies] = useState(friend ? friend.hobbies.join(', ') : '');
    const [jobPosition, setJobPosition] = useState(friend ? friend.jobPosition : '');
    const [gender, setGender] = useState(friend ? friend.gender : '');
    const [contact, setContact] = useState(friend ? friend.contact : '');
    const [address, setAddress] = useState(friend ? friend.address : '');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let valid = true;
        let newErrors = {};
        if (!fullName.trim()) {
            newErrors.fullName = 'Full Name is required';
            valid = false;
        }
        if (!hobbies.trim()) {
            newErrors.hobbies = 'Hobbies are required required';
            valid = false;
        }
        if (!jobPosition.trim()) {
            newErrors.jobPosition = 'Job Position is required';
            valid = false;
        }
        if (!['male', 'female'].includes(gender.toLowerCase())) {
            newErrors.gender = 'Gender must be either male or female';
            valid = false;
        }
        if (!contact.trim()) {
            newErrors.contact = 'Contact is required';
            valid = false;
        }
        if (!address.trim()) {
            newErrors.address = 'Address is required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const generateNewId = () => {
        if (friends.length === 0) return 1;
        const maxId = Math.max(...friends.map(f => parseInt(f.id, 10)));
        return maxId + 1;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        const friendData = {
            id: friend ? friend.id : generateNewId().toString(),
            fullName,
            hobbies: hobbies.split(','),
            jobPosition,
            gender,
            contact,
            address,
            avatar: `https://randomuser.me/api/portraits/${gender.toLowerCase() === 'male' ? 'men' : 'women'}/${friend ? friend.id : generateNewId().toString()}.jpg`
        };
        if (isEditing) {
            await updateFriend(friendData);
        } else {
            await createFriend(friendData);
        }
        onClose();
    };

    const deleteHandler = () => {
        deleteFriend(friend.id);
        onClose();
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
            {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Hobbies (comma separated)"
                value={hobbies}
                onChangeText={setHobbies}
            />
            {errors.hobbies && <Text style={styles.error}>{errors.hobbies}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Job Position"
                value={jobPosition}
                onChangeText={setJobPosition}
            />
            {errors.jobPosition && <Text style={styles.error}>{errors.jobPosition}</Text>}
            <TextInput
                style={styles.input}
                placeholder='Gender'
                value={gender}
                onChangeText={setGender}
            />
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Contact"
                value={contact}
                onChangeText={setContact}
            />
            {errors.contact && <Text style={styles.error}>{errors.contact}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />
            {errors.address && <Text style={styles.error}>{errors.address}</Text>}
            <Button title={isEditing ? 'Update Friend' : 'Add Friend'} onPress={handleSubmit} />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash"  size={32} color="red" onPress={deleteHandler} />
                </View>
            )}
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
        width: 280,
        borderWidth: 1,
        borderColor: '#6200ea',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        alignItems: 'center',
        marginLeft: 20, 
    }
});
