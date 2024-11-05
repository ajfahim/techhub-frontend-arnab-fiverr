import { useContext } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
// import { useWorkoutsContext } from "./UseWorkoutsContext";

export const useLogout=()=>{

    const navigate =useNavigate();
    const {dispatch}=useAuthContext();
    // const {dispatch:dispatchW}=useWorkoutsContext();
    const logout=()=>{


        localStorage.removeItem('user');


        dispatch({type:'LOGOUT'});
        // dispatchW({type:'SET_WORKOUTS', payload:null})
        navigate('/')
    }


    return {logout};
}