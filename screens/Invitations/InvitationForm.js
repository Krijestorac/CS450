import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Button } from 'react-native';
import { InvitationsContext } from '../../store/invitations-context';
import { useContext, useState, useEffect } from 'react';
import IconButton from '../../components/IconButton';

export default function InvitationForm({ invitation, isEditing, onClose }) {

    const { createInvitation, updateInvitation, deleteInvitation, invitations } = useContext(InvitationsContext);
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [invitedGroup, setInvitedGroup] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (invitation) {
            setEventName(invitation.eventName);
            setEventDate(formatDate(invitation.eventDate));
            setEventTime(invitation.eventTime);
            setEventLocation(invitation.eventLocation);
            setInvitedGroup(Array.isArray(invitation.invitedGroup) ? invitation.invitedGroup.join(', ') : '');
        }
    }, [invitation]);

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
    };

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return `${year}-${month}-${day}`;
    };

    const generateNewId = () => {
        if (invitations.length === 0) return 1;
        const maxId = Math.max(...invitations.map(inv => parseInt(inv.id, 10)));
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
        if (!invitedGroup.trim()) {
            newErrors.invitedGroup = 'Invited Groups are required';
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
            eventDate: parseDate(eventDate),
            eventTime,
            eventLocation,
            invitedGroup: invitedGroup.split(',').map(group => group.trim()), // Split the invitedGroup string into an array
        };
        try {
            if (isEditing) {
                await updateInvitation(invitationData);
            } else {
                await createInvitation(invitationData);
            }
            onClose();
        } catch (error) {
            console.error("Error saving invitation:", error);
        }
    };

    const deleteHandler = async () => {
        try {
            await deleteInvitation(invitation.id);
            onClose();
        } catch (error) {
            console.error("Error deleting invitation:", error);
        }
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
            {errors.eventName && <Text style={styles.error}>{errors.eventName}</Text>}
            <TextInput
                style={styles.input}
                placeholder="DD.MM.YYYY"
                value={eventDate}
                onChangeText={handleDateChange}
                keyboardType="numeric"
                maxLength={10}
            />
            {errors.eventDate && <Text style={styles.error}>{errors.eventDate}</Text>}
            <TextInput
                style={styles.input}
                placeholder="HH:mm"
                value={eventTime}
                onChangeText={handleTimeChange}
                keyboardType="numeric"
                maxLength={5}
            />
            {errors.eventTime && <Text style={styles.error}>{errors.eventTime}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Location"
                value={eventLocation}
                onChangeText={setEventLocation}
            />
            {errors.eventLocation && <Text style={styles.error}>{errors.eventLocation}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Invited Groups"
                value={invitedGroup}
                onChangeText={setInvitedGroup}
            />
            {errors.invitedGroup && <Text style={styles.error}>{errors.invitedGroup}</Text>}
            <Button title={isEditing ? 'Update Invitation' : 'Add Invitation'} onPress={handleSubmit} />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" size={32} color="red" onPress={deleteHandler} />
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
    },
});
