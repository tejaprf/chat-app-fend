import {useState} from "react"
import { useNavigate } from "react-router-dom";
import api from "../../apis.jsx"
import { useGlobalContext } from "../../context/useContext.jsx";


const Login=()=>{
    const [user,setUser]=useState({userName:'',password:''});
    const {globalState,setGlobalState}=useGlobalContext();
    const [isLoading,setLoading]=useState(false);

    const navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault();

        try{
            // const resp=await axios.post(`${import.meta.env.VITE_BACKEND_URL}auth/login`,user);
            const resp=await api.post(`/auth/login`,user);
            setLoading(true);            
            if(globalState.debug)
            console.log("Login component response ",resp);
            if(resp.status<203){
                const data=resp.data;
                alert(data.message)
                setGlobalState({...globalState,id:data.id,fullName:data.fullName,userName:data.userName,isAuth:true});
                navigate('/sidebar');

            }
        }catch(err){
            setGlobalState({...globalState,isAuth:false});

            // console.log(err.response.data.message)
            alert(err.response.data.message || err.response.data.error)
        }
    }

    const handleChange=async (e)=>{
        const {id,value}=e.target;
        // console.log(id,value)
        if(id==="userName")
            setUser({...user,userName:value});
        else
            setUser({...user,password:value});

    }

    return (
        <div className="flex flex-col items-center justify-center w-2/5 min-w-96 border-solid border-gray-400 border-2 text-gray-400 text-2xl bg-zinc-700 rounded-xl">
            <h1 className="w-full p-4 text-center text-black font-bold text-3xl">Login
                <span className="text-blue-500 ml-4">ChatApp</span>
            </h1>
            <form className="w-3/4" onSubmit={handleSubmit}>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                <input id="userName" value={user.userName} onChange={handleChange} type="text" placeholder="Enter Username" className="input p-2 w-full border-1 border-gray-500 border-solid"/>
                <label className="label p-2">
                    <span className="text-base label-text">Password</span>
                </label>
                <input id="password" value={user.password} onChange={handleChange} type="text" placeholder="Enter Password" className="input p-2 w-full border-1 border-gray-500 border-solid"/>
                <a href="/signup" className="label text-xs text-gray-400 hover:text-yellow-50">{"Don't"} have an account? SignUp</a>
                <button className=" mb-4 input border-1 border-gray-500 border-solid text-gray-400 text-xl font-bold min-w-34">{isLoading?<span className="loading loading-spinner"></span>:"Login"}</button>
            </form>
        </div>
    );
}

export default Login;