import { useState } from "react";
import { useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useSignup=()=>{
    const navigate = useNavigate();
    const [error,setError]=useState(null);
    const {dispatch}=useAuthContext();

    const signup=async(firstname, lastname, email, password,role)=>{
        setError(null);

        console.log("AP=>",firstname,lastname,email,password,role)

        const response=await fetch("http://localhost:4000/api/user/signup",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({firstname, lastname, email, password, role})
        })

        const json=await response.json();

        if(!response.ok){
            return (json.error);
            setError(json.error);
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json));

            dispatch({type:'LOGIN',payload:json})
            if(json?.user?.role === 'school-owner') {
                navigate('/dashboard')
            }
            else if(json?.user?.role === 'teacher') {
                navigate('/teacherDashboard/profile')
            }

        }
    }
    const gSignup=async(firstname, lastname, email,role)=>{
        setError(null);

        const response=await fetch("http://localhost:4000/api/user/signup",{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify({firstname, lastname, email,role})
        })

        const json=await response.json();

        if(!response.ok){
            return (json.error);
            setError(json.error);
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json));

            dispatch({type:'LOGIN',payload:json})
            if(json?.user?.role === 'school-owner') {
                navigate('/dashboard')
            }
            else if(json?.user?.role === 'teacher') {
                navigate('/teacherDashboard/profile')
            }

        }
    }

    return {signup,gSignup,error};
}