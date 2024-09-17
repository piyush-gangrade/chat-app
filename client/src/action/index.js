import { loginUser, newMessage, signupUser } from "../api";

export const signupAction = async ({request}) => {
    const formData = await request.formData();
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if(password !== confirmPassword){
        return {response: "Confirm Password is not same", status: false}
    }

    try{
        const res = await signupUser(username, email, password);
        if(res.data?.success){
            return res.data;
        }
        else{
            throw res.data;
        }
    }
    catch(err){
        console.error(err)
    }
}

export const loginAction = async ({request}) => {
    const formData = await request.formData();
    
    const username = formData.get("username");
    const password = formData.get("password");
    
    try{
        const res = await loginUser(username, password);
        if(res.data?.success){
            return res.data;
        }
        else{
            throw res.data;
        }
    }
    catch(err){
        console.error(err)
        return err.response.data;
    }
}
