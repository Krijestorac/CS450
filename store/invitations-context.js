import React, { useReducer, createContext, useEffect } from "react";
import { getInvitations } from '../services/api';
import { useState } from "react";

export const InvitationsContext = createContext({
    invitations: [],
    setInvitations: (invitations) => { },
    createInvitation: ({ id, friendId, date }) => { },
    deleteInvitation: (id) => { },
    updateInvitation: ({ id, friendId, date }) => { }
});

function invitationsReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return {
                invitations: action.payload.reverse()
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

    function createInvitation({ id, friendId, date }) {
        dispatch({
            type: 'CREATE',
            payload: {
                id,
                friendId,
                date
            }
        });
    }

    function deleteInvitation(id) {
        dispatch({
            type: 'DELETE',
            payload: id
        });
    }

    function updateInvitation({ id, friendId, date }) {
        dispatch({
            type: 'UPDATE',
            payload: {
                id,
                friendId,
                date
            }
        });
    }

    const value = {
        invitations: invitationsState.invitations,
        setInvitations,
        createInvitation,
        deleteInvitation,
        updateInvitation
    };

    return <InvitationsContext.Provider value={value}>{children}</InvitationsContext.Provider>;
}

export default InvitationsContextProvider;