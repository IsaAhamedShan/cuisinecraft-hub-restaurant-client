import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'http://localhost:5000/',
    // baseURL:'https://cuisinecraft-hub-restaurant-server.onrender.com',
    withCredentials:true
})
const useAxiosPublic = () => {
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
    return axiosPublic
};

export default useAxiosPublic;