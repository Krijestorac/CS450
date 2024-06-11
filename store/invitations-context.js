import React, { useReducer, createContext, useEffect, useContext } from "react";
import { getInvitations, modifyInvitation, removeInvitation, addInvitation, updateFriendWithInvitation } from '../services/api';
import { useState } from "react";
import { FriendsContext } from './friends-context';

export const InvitationsContext = createContext({
    invitations: [],
    setInvitations: (invitations) => { },
    createInvitation: ({ id, friendId, date }) => { },
    deleteInvitation: (id) => { },
    updateInvitation: ({ id, friendId, date }) => { },
    sendInvitation: (invitation, callback) => { }
});

function invitationsReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return {
                invitations: action.payload
            };
        case 'CREATE':
            return {
                invitations: [action.payload, ...state.invitations]
            };
        case 'DELETE':
            return {
                invitations: state.invitations.filter(invitation => invitation.id !== action.payload)
            };
        case 'UPDATE':
            return {
                invitations: state.invitations.map(invitation => invitation.id === action.payload.id ? action.payload : invitation)
            };
        default:
            return state;
    }
}

function InvitationsContextProvider({ children }) {
    const [invitationsState, dispatch] = useReducer(invitationsReducer, { invitations: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { friends } = useContext(FriendsContext);

    const fetchInvitations = async () => {
        try {
            const invitationsData = await getInvitations();
            dispatch({ type: 'SET', payload: invitationsData });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchInvitations();
    }, []);

    function setInvitations(invitations) {
        dispatch({
            type: 'SET',
            payload: invitations
        });
    }

    async function createInvitation({ id, eventName, eventDate, eventTime, eventLocation, invitedGroup }) {
        try {
            const newInvitation = { id, eventName, eventDate, eventTime, eventLocation, invitedGroup };
            const addedInvitation = await addInvitation(newInvitation);
            dispatch({
                type: 'CREATE',
                payload: addedInvitation
            });
        } catch (error) {
            setError(error.message);
        }
    }

    async function deleteInvitation(id) {
        try {
            await removeInvitation(id);
            dispatch({
                type: 'DELETE',
                payload: id
            });
        } catch (error) {
            setError(error.message);
        }
    }

    async function updateInvitation({ id, eventName, eventDate, eventTime, eventLocation, invitedGroup }) {
        try {
            const updatedInvitation = await modifyInvitation({ id, eventName, eventDate, eventTime, eventLocation, invitedGroup });
            dispatch({
                type: 'UPDATE',
                payload: updatedInvitation
            });
        } catch (error) {
            setError(error.message);
        }
    }
    
    // This function is used to send the invitation to the friends
    // It will find the friends that have hobbies that match the invited groups
    // Callback function is called after the invitations are sent
    async function sendInvitation(invitation, callback) {
        try {
            const matchedFriends = friends.filter(friend =>
                invitation.invitedGroup.some(group => friend.hobbies.includes(group))
            );
            
            for (const friend of matchedFriends) {
                await updateFriendWithInvitation(friend.id, invitation.eventName);
                console.log(`Invitation sent to ${friend.fullName} for ${invitation.eventName}`);
            }

            if(callback) {
                callback(matchedFriends);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const value = {
        invitations: invitationsState.invitations,
        setInvitations,
        createInvitation,
        deleteInvitation,
        updateInvitation,
        sendInvitation
    };

    return <InvitationsContext.Provider value={value}>{children}</InvitationsContext.Provider>;
}

export default InvitationsContextProvider;
