import React,{useState} from "react";
import axios from 'axios';
const REACT_APP_SERVERURL="http://localhost:5000/";
const SignUp=()=>{
    const [user, setUser] = useState({ fullName:'', userName:'', password:'', confirmPassword:'', gender:'' });

    const [isChecked,setChecked]=useState({male:false,female:false});
    const handleCheckbox=async (e)=>{
        // console.log(e.target.id)
        if(e.target.id==="male"){
            if(isChecked.male)
                setChecked({...isChecked,male:!isChecked.male});
            else
            setChecked({female:isChecked.male,male:!isChecked.male});
        }else{
            if(isChecked.female)
                setChecked({...isChecked,female:!isChecked.female});
            else
            setChecked({male:isChecked.female,female:!isChecked.female});
        }
        // console.log(isChecked);
        validate(e);
    }
    // const [error,setError]=useState({
    //     userName:'', password:'', confirmPassword:'', gender:''
    // });

    const [errors,setErrors]=useState({});
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(user)
    }

    const validate=async (e)=>{
        e.preventDefault()
        const {id,value}=e.target;
        let newErrors={...errors};
        // console.log({id,value});
        // console.log(value);
        if(id==="userName"){
            // console.log("Username validation");
            setUser({...user,userName:value});
            const res=await axios.post(`${REACT_APP_SERVERURL}auth/checkUser/${value}`);
            console.log(res.data);
            if(res.data.error==="Username already exists"){
                console.log('Username Already exists');
                // setError({...error,userName:'x UserName already exists'})
                newErrors.userName='x UserName already exists'
            }else{
                // setError({...error,userName:''})
                delete newErrors.userName
            }
            
        }else if(id==="password"){
            setUser({...user,password:value});
            if(user.password.length<8){
                // setError({...error,password:"x  Minimum length 8 characters"})
                newErrors.password="x  Minimum length 8 characters"
            }else{
                // setError({...error,password:''})
                delete newErrors.password
            }
        }else if(id==="confirmPassword"){
            setUser({...user,confirmPassword:value});
            console.log(user);
            if(user.password!==value){
                // setError({...error,confirmPassword:"x Passwords doesn't match"})
                newErrors.confirmPassword="x Passwords doesn't match"
            }else{
                // setError({...error,confirmPassword:""})
                delete newErrors.confirmPassword
            }
        }else if(id==="male" || id==="female"){
            console.log(value)
            if(isChecked.male){
                setUser({...user,gender:"Male"});
            }else if(isChecked.female){
                setUser({...user,gender:"Female"})
            }
            
            // if(!(isChecked.male || isChecked.female) ){
                if(!value){

                // setError({...error,gender:"x Please select the gender"})
                newErrors.gender="x Please select the gender"
            }else{
                // setError({...error,gender:""})
                delete newErrors.gender
            }
            
            
        }
        // else if(id==="password"){
            //     if()
            // }
            setErrors(newErrors);
        
        }
        return (
        <div className="flex flex-col items-center justify-center w-2/5 min-w-96 border-solid border-gray-400 border-2 text-gray-400 text-2xl bg-zinc-700">
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
                    <span className="text-base label-text">Password</span>
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

                <button className=" mb-4 input border-1 border-gray-500 border-solid text-gray-400 text-xl font-bold">SignUp</button>
            </form>
        </div>
    );
}

export default SignUp;