import axios from "axios";

const url = "http://192.168.0.19:3000";

export const getFriends = async () => {
    try {
        const response = await axios.get(`${url}/friends`);
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

export const acceptInvitation = async (id) => {
    try {
        await axios.put(`${url}/invitations/${id}`);
    } catch (error) {
        console.error(error);
    }
};


