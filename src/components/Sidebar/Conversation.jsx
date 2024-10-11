import React from 'react'
import Avatar from 'react-avatar';
import { useGlobalContext } from '../../context/useContext';

// border-2 border-solid border-gray-50
export const Conversation = (props) => {
  const {globalState,setGlobalState}=useGlobalContext();

  return (
    <div className='flex items-start items-center hover:bg-gray-400 rounded-full w-11/12 pt-1 pb-1 text-gray-700' onClick={()=>{setGlobalState({...globalState,friendId:props.friendId,friendName:props.name})}}>
        <Avatar name={props.name} size="40" className={`rounded-full w-4 h-4 avatar ${props.isOnline?"online":""}`}/>
        {/* <Avatar name={props.name} size="40" className='rounded-full w-4 h-4 avatar online'/> */}

        <h1 className=' text-2xl pl-3'>{props.name}</h1>  
    </div>
  )
}
