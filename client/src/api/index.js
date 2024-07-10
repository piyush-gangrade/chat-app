import axios from "axios";

const token = localStorage.getItem("token");

const apiServer = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        Authorization: `Bearer ${token}`
    },
    withCredentials: true,
    timeout: 30000
})

const signupUser = (username, email, password) => {
    return apiServer.post("auth/signup", {username, email, password});
}

const loginUser = (username, password) => {
    return apiServer.post("auth/login", {username, password});
}

const verifyEmail = (userId, verificationToken) => {
    return apiServer.get(`auth/verify-email/${userId}/${verificationToken}`);
}

const refershAccessToken = () => {
    return apiServer.post(`auth/refersh-access-token`);
}

const getAllConnections = () => {
    return apiServer.get("user/chat");
}

const getMessages = (chatId)=>{
    return apiServer.get(`user/messages/${chatId}`);
}

export {
    signupUser,
    loginUser,
    verifyEmail,
    refershAccessToken,
    getAllConnections,
    getMessages
}