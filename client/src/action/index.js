import { loginUser, signupUser } from "../api";

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
        return ({response: err.response.data.Error, stauts: err.response.status});
    }
}

export const loginAction = async ({request}) => {
    const formData = await request.formData();
    
    const username = formData.get("username");
    const password = formData.get("password");
    
    try{
        const res = await loginUser(username, password);
        const data = {
            token: res.data.token,
            username: res.data.user.username
        }
        console.log(res)
        return data;
    }
    catch(err){
        console.log({response: err.response.data.Error, status: err.response.status})
        return ({error: err.response.data.Error})
    }
}