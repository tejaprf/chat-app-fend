import { CiPaperplane } from "react-icons/ci";
import { useState } from "react";
import { addMessage } from '../../reduxStore/chatSlice';
import { useGlobalContext } from '../../context/useContext.jsx';
import { useDispatch } from 'react-redux';

const MessageInput = () => {
  const {globalState,setGlobalState}=useGlobalContext();
  // console.log('In Message input component ',globalState);
  const [message,setMessage]=useState("");

  const handleChange=(e)=>{
    setMessage(e.target.value);
    // console.log(message)
  }
  const dispatch=useDispatch();


  const handleSubmit=async (e)=>{
    e.preventDefault();
    if(globalState.debug)
    console.log('From Message input component ',{messageData:message,userId:globalState.friendId})
    dispatch(addMessage({messageData:message,userId:globalState.friendId}));
    setMessage("")
  }

  
  const handleKeyPress=async (e)=>{
    // console.log("hey")
      if(e.key==='Enter'){
        handleSubmit(e);
      }
  }

  return (
    <div className='flex relative p-2'>
        <input type="text" className='w-full input h-9 border-t-2 border-l-0 border-solid border-gray-400' onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleKeyPress(e)} value={message} />
        <button type='submit' onClick={(e)=>handleSubmit(e)}>
            <CiPaperplane className='text-gray-200 absolute right-5 bottom-3.5 text-2xl'/>
        </button>
    </div>
  )
}

export default MessageInput