import { loginUser, newMessage, signupUser } from "../api";

export const signupAction = async ({request}) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if(password !== confirmPassword){
        return {Error: "Confirm Password is not same"}
    }

    try{
        const res = await signupUser(username, email, password);
        return ({response: res.data, stauts: res.status});
    }
    catch(err){
        console.error(err.response.data)
        return ({response: err.response.data.Error, stauts: err.response.status});
    }
}

export const loginAction = async ({request}) => {
    const formData = await request.formData();
    
    const username = formData.get("username");
    const password = formData.get("password");
    
    try{
        const res = await loginUser(username, password);
        return ({token: res.data.accessToken, userId: res.data.userId});
    }
    catch(err){
        console.error(err.response.data)
        return ({error: err.response.data.Error})
    }
}

export const chatAction = async ({request, params}) => {
    const formData = await request.formData();
    const message = formData.get("message");
    // console.log(message, params)
    try {
        const res = await newMessage({message , chatId: params.chatId});
        if(!res.data?.success){
            throw new Error(res.data?.response)
        }
    } 
    catch (error) {
        console.error(error)
    }
    return message;
}