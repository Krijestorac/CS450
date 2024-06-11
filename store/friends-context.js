import React, { useReducer, createContext, useEffect } from "react";
import { addFriend, getFriends, removeFriend, modifyFriend } from "../services/api";
import { useState } from "react";

export const FriendsContext = createContext({
    friends: [],
    setFriends: (friends) => { },
    createFriend: ({ id, fullName, hobbies, jobPosition, gender, contact, address }) => { },
    deleteFriend: (id) => { },
    updateFriend: ({ id, fullName, hobbies, jobPosition, gender, contact, address }) => { }
});

function friendsReducer(state, action) {
    switch (action.type) {
        case 'SET':
            return {
                friends: action.payload
            };
        case 'CREATE':
            return {
                friends: [action.payload, ...state.friends]
            };
        case 'DELETE':
            return {
                friends: state.friends.filter(friend => friend.id !== action.payload)
            };
        case 'UPDATE':
            return {
                friends: state.friends.map(friend => friend.id === action.payload.id ? action.payload : friend)
            };
        default:
            return state;
    }
}

function FriendsContextProvider({ children }) {
    const [friendsState, dispatch] = useReducer(friendsReducer, { friends: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchFriends = async () => {
        try {
            const friendsData = await getFriends();
            dispatch({ type: 'SET', payload: friendsData });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    function setFriends(friends) {
        dispatch({
            type: 'SET',
            payload: friends
        });
    }

    async function createFriend({ id, fullName, hobbies, jobPosition, gender, contact, address, avatar }) {
        try {
            const newFriend = { id, fullName, hobbies, jobPosition, gender, contact, address, avatar };
            const addedFriend = await addFriend(newFriend);
            dispatch({
                type: 'CREATE',
                payload: addedFriend
            });
        } catch (error) {
            setError(error.message);
        }
    }

    async function deleteFriend(id) {
        try {
            await removeFriend(id);
            dispatch({
                type: 'DELETE',
                payload: id
            });
        } catch (error) {
            setError(error.message);
        }
    }

    async function updateFriend({ id, fullName, hobbies, jobPosition, gender, contact, address, avatar }) {
        try {
            const updatedFriend = await modifyFriend({ id, fullName, hobbies, jobPosition, gender, contact, address, avatar });
            dispatch({
                type: 'UPDATE',
                payload: updatedFriend
            });
        } catch (error) {
            setError(error.message);
        }
    }

    const value = {
        friends: friendsState.friends,
        setFriends,
        createFriend,
        deleteFriend,
        updateFriend
    };

    return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export default FriendsContextProvider;
