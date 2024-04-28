import { signupUser } from "../api";

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
        const res = await signupUser(username, email, password)
        return res.data;
    }
    catch(err){
        console.error(err.response.data)
        return err.response.data
    }
}

export const loginAction = async ({request}) => {
    const formData = await request.formData();
    
    const username = formData.get("username");
    const password = formData.get("password");
    
    try{
        const res = await axios.post("http://localhost:8800/auth/login", {
            username,
            password
        })
        const data = {
            token: res.data.token,
            username: res.data.user.username
        }
        return data;
    }
    catch(err){
        return {Error: err.response.data.Error}
    }
}