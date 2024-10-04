import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis.jsx"
import { useGlobalContext } from "../../context/useContext.jsx";
const SignUp=()=>{
    const [user, setUser] = useState({ fullName:'', userName:'', password:'', confirmPassword:'', gender:'' });
    const [isChecked,setChecked]=useState({});
    const {globalState,setGlobalState}=useGlobalContext();
    const [errors,setErrors]=useState({});
    const [isLoading,setLoading]=useState(false);

    const navigate=useNavigate();

    const handleCheckbox=async (e)=>{
        // console.log(e.target.id)
        const {id,value}=e.target;
        if(id==="male"){
            // if(isChecked.male)
            //     setChecked({...isChecked,male:!isChecked.male});
            // else
            // setChecked({female:isChecked.male,male:!isChecked.male});
            setChecked({male:value,female:!value});
            
        }else{
            setChecked({female:value,male:!value});
            // if(isChecked.female)
            //     setChecked({...isChecked,female:!isChecked.female});
            // else
            // setChecked({male:isChecked.female,female:!isChecked.female});
        }



        // setChecked(prevState => ({
        //     male: id === 'male' ? value : prevState.male,
        //     female: id === 'female' ? value : prevState.female
        // }));
        validate(e);
    }
    // const [error,setError]=useState({
    //     userName:'', password:'', confirmPassword:'', gender:''
    // });
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log(user)
        try{
            const resp=await api.post(`auth/signup`,user);
            // const resp=await axios.post(`${REACT_APP_SERVERURL}auth/signup`,user);

            if(globalState.debug)
            console.log(resp.data);
            setLoading(true);            
            if(resp.status<203)
            {
                const data=resp.data;

                alert(data.message)
                setGlobalState({...globalState,id:data.id,fullName:data.fullName,userName:data.userName,isAuth:true});
                navigate('/sidebar')
            }
        }catch(err){
            // console.log(err.data.error)
            setGlobalState({...globalState,isAuth:false});
            alert(err.response.data.error)
            
        }
    }

    const validate=async (e)=>{
        const {id,value}=e.target;
        // console.log({id,value});
        // console.log(value);
        if(id==="userName"){
            setUser({...user,userName:value});
            const res=await api.post(`auth/checkUser/${value}`);
            // console.log(res.data);
            if(res.data.error==="Username already exists"){
                console.log('Username Already exists');
                setErrors({...errors,userName:'x UserName already exists'})
                // newErrors.userName='x UserName already exists'
            }else{
                setErrors({...errors,userName:''})
                // delete newErrors.userName
            }
            
        }else if(id==="password"){
            setUser({...user,password:value});
            if(value.length<8){
                setErrors({...errors,password:"x  Minimum length 8 characters"})
                // newErrors.password="x  Minimum length 8 characters"
            }else{
                // delete newErrors.password
                if(value!==user.confirmPassword){
                    setErrors({...errors,password:'',confirmPassword:"x Passwords doesn't match"})
                // newErrors.confirmPassword="x Passwords doesn't match"
                }else{
                    setErrors({...errors,password:'',confirmPassword:""})
                    // delete newErrors.confirmPassword
                }
            }
            

        }else if(id==="confirmPassword"){
            setUser({...user,confirmPassword:value});
            if(user.password!==value){
                setErrors({...errors,confirmPassword:"x Passwords doesn't match"})
                // newErrors.confirmPassword="x Passwords doesn't match"
            }else{
                setErrors({...errors,confirmPassword:""})
                // delete newErrors.confirmPassword
            }
        }else if(id==="male" || id==="female"){

            if(id==="male"){
                setUser({...user,gender:"Male"});
            }else{
                setUser({...user,gender:"Female"})
            }
            
            if(isChecked){
                setErrors({...errors,gender:""})
                // delete newErrors.gender
            }else{
                setErrors({...errors,gender:"x Please select the gender"})
                // newErrors.gender="x Please select the gender"
            }
            
            
        }
            // setErrors(newErrors);
        
        }
        return (
        <div className="flex flex-col items-center justify-center w-2/5 min-w-96 border-solid border-gray-400 border-2 text-gray-400 text-2xl bg-zinc-700 rounded-xl">
            <h1 className="w-full p-4 text-center text-black font-bold text-3xl">SignUp
                <span className="text-blue-500 ml-4">ChatApp</span>
            </h1>
            <form className="w-3/4" onSubmit={handleSubmit}>
                <label className="label p-2">
                    <span className="text-base label-text">Full Name</span>
                </label>
                <input required type="text" id="fullName" value={user.fullName} onChange={(e)=>setUser({...user,fullName:e.target.value})} placeholder="Enter Full Name" className="input p-2 w-full border-1 border-gray-500 border-solid"/>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                {/* <input required type="text" id="userName" value={user.userName} onChange={(e)=>setUser({...user,userName:e.target.value})} placeholder="Enter Username" className="input p-2 w-full border-1 border-gray-500 border-solid"/> */}
                <input required type="text" id="userName" value={user.userName} onChange={(e)=>validate(e)} placeholder="Enter Username" className="input p-2 w-full border-1 border-gray-500 border-solid"/>
                {errors.userName && <p className="text-red-500 text-sm text-left p-2 pb-0">{errors.userName}</p >}
                <label className="label p-2">
                    <span className="text-base label-text">Password</span>
                </label>
                <input required type="password" id="password" value={user.password} onChange={(e)=>validate(e)} placeholder="Enter Password" className="input p-2 w-full border-1 border-gray-500 border-solid"/>
                {errors.password && <p className="text-red-500 text-sm text-left p-2 pb-0">{errors.password}</p >}

                <label className="label p-2">
                    <span className="text-base label-text">Confirm Password</span>
                </label>
                <input required type="text" id="confirmPassword" value={user.confirmPassword} onChange={(e)=>validate(e)} placeholder="Confirm Password" className="input p-2 w-full border-1 border-gray-500 border-solid"/>
                {errors.confirmPassword && <p className="text-red-500 text-sm text-left p-2 pb-0">{errors.confirmPassword}</p >}
                <div className="flex">
                    <label className="label p-2">
                        <span className="text-base label-text">Male</span>
                    </label>
                    <input type="checkbox" id="male" checked={isChecked.male} onChange={(e)=>handleCheckbox(e)} className="p-2 border-1 border-gray-500 border-solid"/>
                    <label className="label p-2">
                        <span className="text-base label-text">Female</span>
                    </label>
                    <input type="checkbox" id="female" checked={isChecked.female} onChange={(e)=>handleCheckbox(e)} className="p-2 border-1 border-gray-500 border-solid"/>
                </div>
                {errors.gender && <p className="text-red-500 text-sm text-left p-2 pb-0">{errors.gender}</p >}

                <a href="/" className="label text-xs text-gray-400 hover:text-yellow-50">Have an account? Login</a>

                <button className=" mb-4 input border-1 border-gray-500 border-solid text-gray-400 text-xl font-bold min-w-34">{isLoading?<span className="loading loading-spinner"></span>:"SignUp"}</button>
            </form>
        </div>
    );
}

export default SignUp;