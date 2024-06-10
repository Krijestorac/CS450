import { Modal, StyleSheet, Text, View } from 'react-native'
import ErrorOverlay from '../../components/ErrorOverlay';
import Spinner from '../../components/Spinner';
import InvitationList from './InvitationList';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useContext, useState } from 'react';
import { InvitationsContext } from '../../store/invitations-context';
import InvitationForm from './InvitationForm';
import { Button } from 'react-native';

export default function InvitationScreen({ navigation }) {

    const { invitations, isLoading, error } = useContext(InvitationsContext);
    const [formVisible, setFormVisible] = useState(false);


    const handleAddInvitation = () => {
        setFormVisible(true);
    };

    const handleEditInvitation = (invitation) => {
        navigation.navigate('InvitationForm', { invitation, isEditing: true });
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
            <Modal visible={formVisible} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <InvitationForm
                            isEditing={false}
                            onClose={() => setFormVisible(false)}
                        />
                        <Button title="Cancel" onPress={() => setFormVisible(false)} color="#6200ea" />
                    </View>
                </View>
            </Modal>
            <InvitationList invitations={invitations} onEditInvitation={handleEditInvitation} />
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
