import {useState ,useEffect } from 'react'
import { Conversation } from './Conversation.jsx'
import api from '../../apis.jsx'
import { useGlobalContext } from '../../context/useContext.jsx'
import { useSocketContext } from '../../context/socketContext.jsx'

// export const Conversations =  () => {
//   const {globalState,setGlobalState}=useGlobalContext();
//   useEffect(() => {
//     const getFriends = async () => {
//       try {
//         console.log("Fetching friends..."); // Debug log
//         const res = await api.get('/user/getFriends');
//         console.log("Friends fetched: ", res.data);
//         setGlobalState(prevState => ({ ...prevState, friends: res.data }));
//       } catch (error) {
//         console.error("Error fetching friends: ", error);
//       }
//     };

//     getFriends();
//   }, []); // Runs only once on mount
  
  
export const Conversations = () => {
  const { globalState, setGlobalState } = useGlobalContext();
  const {onlineUsers}=useSocketContext();
  console.log("Online users in conversations",onlineUsers)

  const getFriends = async () => {
      try {
        const res = await api.get('/user/getFriends');
        if(globalState.debug){
          console.log("Fetching friends...");
          console.log("Friends fetched: ", res.data);
        }
          setGlobalState(prevState => ({ ...prevState, friends: res.data }));
      } catch (error) {
          console.error("Error fetching friends: ", error);
      }
  };

  useEffect(() => {
      getFriends();
  }, []); // Runs only once on mount




  return (
    <div className='flex flex-col align-middle w-full pt-3 overflow-y-scroll overflow-x-hidden'>
      {/* <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/>
      <Conversation name="hello"/>
      <Conversation name="Teja"/> */}
      {globalState.friends?.map((x)=>(
        <Conversation key={x._id} name={x.userName} friendId={x._id} isOnline={onlineUsers.includes(x._id)}/>
        // isOnline={()=>{onlineUsers.includes(globalState.friendId)}}
      ))}
    </div>
  )
}
