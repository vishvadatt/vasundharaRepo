import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [login,setLogin] = useState({
        email : "",
        password : ""
    })
    const [errMsg,setErrMsg] = useState("");

    const {email,password} = login

    const onChangeEvent = (e) => {
        console.log(e.target);
        const {name,value} = e.target
        setLogin({
            ...login,
            [name] : value,
        });
    }

    const onSubmitItem = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post("http://localhost:8080/api/login",login);
            console.log("re..",response.data.data.status);
            if(response.data.data.status === 200){  
                setErrMsg("login SuccessFully")
                localStorage.setItem("token",response.data.data.token)
                localStorage.setItem("username",response.data?.data?.user?.username)
                setTimeout(() => {
                    navigate("/List")
                },500);
            }else{
                setErrMsg(response.data?.message)
                console.log("errpr");
            }
        } catch (e) {
            console.log("e....");
        }
        
    }
  return (
    <div>
        <h3>Login</h3>
        <br />
        <form onSubmit={(e) => onSubmitItem(e)}>
            {errMsg !== "" && errMsg}
            <br />
            <input type="text" name='email' value={email} onChange={onChangeEvent} placeholder='Enter Email'/>
            <br />
            <input type="password" name='password' value={password} onChange={onChangeEvent} placeholder='enter password'/>
            <br />
            <br />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login