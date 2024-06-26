import axios from "axios";

const url = "http://192.168.0.27:3000";

export const getFriends = async () => {
    try {
        const response = await axios.get(`${url}/friends`);
        return response.data;
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
};

export const addFriend = async (friend) => {
    try {
        const response = await axios.post(`${url}/friends`, friend);
    } catch (error) {
        console.error(error);
    }
    return response.data;
};

export const modifyFriend = async (friend) => {
    try {
        const response = await axios.put(`${url}/friends/${friend.id}`, friend);
    } catch (error) {
        console.error(error);
    }
    return response.data;
};

export const removeFriend = async (id) => {
    try {
        const response = await axios.delete(`${url}/friends/${id}`);
    } catch (error) {
        console.error(error);
    }
    return response.data;
};

// This function is used to update the friend with the invitation
export const updateFriendWithInvitation = async (id, partyName) => {
    try {
        const response = await axios.get(`${url}/friends/${id}`);
        const friend = response.data;
        const updatedFriend = { 
            ...friend, 
            invitations: friend.invitations ? [...friend.invitations, partyName] : [partyName] 
        };
        const patchResponse = await axios.patch(`${url}/friends/${id}`, { invitations: updatedFriend.invitations });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getInvitations = async () => {
    try {
        const response = await axios.get(`${url}/invitations`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const addInvitation = async (invitation) => {
    try {
        const response = await axios.post(`${url}/invitations`, invitation);
    } catch (error) {
        console.error(error);
    }
    return response.data;
};

export const modifyInvitation = async (invitation) => {
    try {
        const response = await axios.put(`${url}/invitations/${invitation.id}`, invitation);
    } catch (error) {
        console.error(error);
    }
    return response.data;
};

export const removeInvitation = async (id) => {
    try {
        const response = await axios.delete(`${url}/invitations/${id}`);
    } catch (error) {
        console.error(error);
    }
    return response.data;
};


