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

const resendVerification = (userId) => {
    return apiServer.get(`auth/resend-verification/${userId}`);
}

export {
    signupUser,
    loginUser,
    verifyEmail,
    resendVerification
}