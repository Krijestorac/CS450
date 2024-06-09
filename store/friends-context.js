import React, { useReducer, createContext, useEffect } from "react";
import { addFriend, getFriends, modifyFriend } from "../services/api";
import { useState } from "react";
import { useRef } from "react";

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
                friends: action.payload.reverse()
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
    const friendsRef = useRef(friendsState.friends);

    const fetchFriends = async () => {
        try {
            const friendsData = await getFriends();
            dispatch({ type: 'SET', payload: friendsData });
            friendsRef.current = friendsData;
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
        friendsRef.current = friends;
    }

    async function createFriend({ id, fullName, hobbies, jobPosition, gender, contact, address }) {
        try {
            const newFriend = { id, fullName, hobbies, jobPosition, gender, contact, address };
            const addedFriend = await addFriend(newFriend);
            dispatch({
                type: 'CREATE',
                payload: addedFriend
            });
            friendsRef.current = [addedFriend, ...friendsRef.current];
        } catch (error) {
            setError(error.message);
        }
    }

    function deleteFriend(id) {
        dispatch({
            type: 'DELETE',
            payload: id
        });
        friendsRef.current = friendsRef.current.filter(friend => friend.id !== id);
    }

    async function updateFriend({ id, fullName, hobbies, jobPosition, gender, contact, address }) {
        try {
            const newFriend = { id, fullName, hobbies, jobPosition, gender, contact, address };
            const updatedFriend = await modifyFriend(newFriend);
            dispatch({
                type: 'UPDATE',
                payload: updatedFriend
            });
            friendsRef.current = friendsRef.current.map(friend => friend.id === updatedFriend.id ? updatedFriend : friend);
        } catch (error) {
            setError(error.message);
        }
    }

    const value = {
        friends: friendsRef.current,
        setFriends,
        createFriend,
        deleteFriend,
        updateFriend
    };

    return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export default FriendsContextProvider;
