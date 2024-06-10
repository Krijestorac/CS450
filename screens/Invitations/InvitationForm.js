import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../../components/Button';
import { InvitationsContext } from '../../store/invitations-context';
import { useContext } from 'react';
import { useState } from 'react';
import IconButton from '../../components/IconButton';

export default function InvitationForm({ invitation, isEditing, onClose }) {

    const { createInvitation, updateInvitation, deleteInvitation, invitations } = useContext(InvitationsContext);
    const [eventName, setEventName] = useState(invitation ? invitation.eventName : '');
    const [eventDate, setEventDate] = useState(invitation ? invitation.eventDate : '');
    const [eventTime, setEventTime] = useState(invitation ? invitation.eventTime : '');
    const [eventLocation, setEventLocation] = useState(invitation ? invitation.eventLocation : '');
    const [invitedGroups, setInvitedGroups] = useState(invitation ? invitation.invitedGroups : []);
    const [errors, setErrors] = useState({});

    const handleDateChange = (text) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        let formattedDate = cleaned;
        if (cleaned.length > 2 && cleaned.length <= 4) {
            formattedDate = `${cleaned.substring(0, 2)}.${cleaned.substring(2)}`;
        } else if (cleaned.length > 4) {
            formattedDate = `${cleaned.substring(0, 2)}.${cleaned.substring(2, 4)}.${cleaned.substring(4, 8)}`;
        }
        setEventDate(formattedDate);
    };

    const handleTimeChange = (text) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        let formattedTime = cleaned;
        if (cleaned.length > 2) {
            formattedTime = `${cleaned.substring(0, 2)}:${cleaned.substring(2, 4)}`;
        }
        setEventTime(formattedTime);
    };

    const generateNewId = () => {
        if (friends.length === 0) return 1;
        const maxId = Math.max(...friends.map(f => parseInt(f.id, 10)));
        return maxId + 1;
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};
        if (!eventName.trim()) {
            newErrors.eventName = 'Event Name is required';
            valid = false;
        }
        if (!eventDate.trim()) {
            newErrors.eventDate = 'Event Date is required';
            valid = false;
        }
        if (!eventTime.trim()) {
            newErrors.eventTime = 'Event Time is required';
            valid = false;
        }
        if (!eventLocation.trim()) {
            newErrors.eventLocation = 'Event Location is required';
            valid = false;
        }
        if (!invitedGroups.trim()) {
            newErrors.hobbies = 'Invited Groups are required';
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }
        const invitationData = {
            id: invitation ? invitation.id : generateNewId().toString(),
            eventName,
            eventDate,
            eventTime,
            eventLocation,
            invitedGroups,
        };
        if (isEditing) {
            await updateInvitation(invitationData);
        } else {
            await createInvitation(invitationData);
        }
        onClose();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isEditing ? 'Edit Invitation' : 'Add New Invitation'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Event Name"
                value={eventName}
                onChangeText={setEventName}
            />
            {errors.fullName && <Text style={styles.error}>{errors.eventName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="DD.MM.YYYY"
                value={eventDate}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                maxLength={10}
            />
            {errors.hobbies && <Text style={styles.error}>{errors.eventDate}</Text>}
            <TextInput
                style={styles.input}
                placeholder="HH:mm"
                value={eventTime}
                onChangeText={handleTimeChange}
                keyboardType="numeric"
                maxLength={5}
            />
            {errors.jobPosition && <Text style={styles.error}>{errors.eventTime}</Text>}
            <TextInput
                style={styles.input}
                placeholder='Location'
                value={eventLocation}
                onChangeText={setEventLocation}
            />
            {errors.gender && <Text style={styles.error}>{errors.eventLocation}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Invited Groups"
                value={invitedGroups}
                onChangeText={setInvitedGroups}
            />
            {errors.contact && <Text style={styles.error}>{errors.invitedGroups}</Text>}
            <Button title={isEditing ? 'Update Invitation' : 'Add Invitation'} onPress={handleSubmit} />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" size={32} color="red" onPress={handleSubmit} />
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