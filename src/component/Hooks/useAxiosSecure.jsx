import axios from 'axios';
import React from 'react';
const axiosSecure = axios.create({
    baseURL:'http://localhost:5000/',
    // withCredentials:true
})
const useAxiosSecure = () => {
    axios.interceptors.response.use(res=>{
        // console.log(res)
        return res
    },
    error=>{
        if (error.status === (401||403)){
            console.log("error status is ",error.status)
            console.log("logOut user.")
        }
        else{
            console.log("error status is ",error.status)
        }
    }
    )
    return axiosSecure
};

export default useAxiosSecure;