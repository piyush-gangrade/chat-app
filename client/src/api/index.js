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

// apiServer.interceptors.response.use(function (response) {
//     return response;
//   }, async (error) => {
//     console.log(error)
//         if(error.response.status === 401){
//             const res = await refershAccessToken();
//             console.log(res)
//         }
//     return Promise.reject(error);
//   });

const signupUser = (username, email, password) => {
    return apiServer.post("/auth/signup", {username, email, password});
}

const loginUser = (username, password) => {
    return apiServer.post("/auth/login", {username, password});
}

const verifyEmail = (userId, verificationToken) => {
    return apiServer.get(`/auth/verify-email/${userId}/${verificationToken}`);
}

const refershAccessToken = () => {
    return apiServer.post(`/auth/refersh-access-token`);
}

const getAllConnections = () => {
    return apiServer.get("/user/chat");
}

const getMessages = (chatId)=>{
    return apiServer.get(`/user/messages/${chatId}`);
}

const newMessage = ({chatId, senderId, message})=>{
    return apiServer.post(`/user/new-message`, {chatId, senderId, message});
}

const getAllUser = (userId)=>{
    return apiServer.get('/user/get-users', {userId});
}

const newChat = (userId, receiverId)=>{
    return apiServer.post('/user/new-chat', {userId, receiverId});
}

const logout = (userId)=>{
    return apiServer.post("/auth/logout", {userId});
}

export {
    signupUser,
    loginUser,
    verifyEmail,
    refershAccessToken,
    getAllConnections,
    getMessages,
    newMessage,
    getAllUser,
    newChat,
    logout
}