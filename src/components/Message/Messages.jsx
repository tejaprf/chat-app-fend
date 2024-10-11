// import { Message } from './Message.jsx'
// import { addMessageRec, fetchMessages } from "../../reduxStore/chatSlice.ts"
// import { useSelector,useDispatch } from "react-redux";
// import { useEffect } from "react"
// import { useGlobalContext } from '../../context/useContext.jsx';
// import { useSocketContext } from '../../context/socketContext.jsx';



// /*
// Multiple Event Listeners: Each time the Messages component renders, you're adding a new listener for the "newMessage" event. This means that if the component re-renders multiple times, you will have multiple listeners processing the same message, causing it to be added to the state multiple times.

// Solution: Use a useEffect to set up the socket listener, and ensure you clean it up when the component unmounts. Here’s how to modify your useEffect:


// useEffect(() => {
//   const handleNewMessage = (newMessage) => {
//       dispatch(addMessageRec(newMessage));
//   };

//   socket?.on("newMessage", handleNewMessage);

//   // Cleanup function to remove the listener
//   return () => {
//       socket?.off("newMessage", handleNewMessage);
//   };
// }, [dispatch, socket]);

// */


// export const Messages = () => {
//   const {globalState}=useGlobalContext();
//   const {socket,onlineUsers}=useSocketContext();

//   const dispatch=useDispatch();
  

//   if(globalState.debug)
//   console.log("GlobalState from Messages component ",globalState);
//   const messages=useSelector(state=>state.chatReducer.messages);
//   useEffect(()=>{
//     const fetchData = async () => {
//       dispatch(fetchMessages(globalState.friendId));
//     };
//     if(globalState.friendId)
//       fetchData();

//     const handleNewMessage=async (newMessage)=>{
//       dispatch(addMessageRec(newMessage));
//     };

//     socket?.on("newMessage",handleNewMessage);

//     return ()=>{
//       socket?.off("newMessage",handleNewMessage);
//     }
//   },[dispatch,globalState.friendId,socket]);

//   useEffect(()=>{
//     const container = document.getElementById('message-container');
//     if (container) {
//       container.scrollTop = container.scrollHeight; // Scroll to bottom
//       console.log("Scrolled to bottom");
//     }else {
//       console.log("Container not found"); // Debugging log
//     }
//   },[messages])



//   if(globalState.debug)
//   console.log("Messages from Messages component",messages);


//   return (
//     <div className='flex flex-1 flex-col'>

//       <div className=' flex-1 h-[90vh] overflow-y-auto p-4 bg-gray-300 scroll-m-1 bg-scroll' id='message-container'>
//         {messages.map(x=>(
//           <Message key={x._id} message={x} isOnline={onlineUsers.includes(x.senderId)}/>
//         ))}
//         {/* <Message key={messages[0]._id} message={messages[0]}/> */}
//       </div>
//     </div>

//     )
// }

// /*
//         <Message name="KabKas"/>
//         <Message name="Mahlk"/>
//         <Message name="alfdjls"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>
//         <Message name="KabKas"/>

// */


import { Message } from './Message.jsx';
import { addMessageRec, fetchMessages } from "../../reduxStore/chatSlice.ts";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useGlobalContext } from '../../context/useContext.jsx';
import { useSocketContext } from '../../context/socketContext.jsx';

export const Messages = () => {
  const { globalState } = useGlobalContext();
  const { socket, onlineUsers } = useSocketContext();
  const dispatch = useDispatch();

  const messages = useSelector(state => state.chatReducer.messages);

  useEffect(() => {
    const fetchData = async () => {
      if (globalState.friendId) {
         dispatch(fetchMessages(globalState.friendId));
      }
    };

    fetchData();

    const handleNewMessage = (newMessage) => {
      dispatch(addMessageRec(newMessage));
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [dispatch, globalState.friendId, socket]);



  return (
      <div
        id='message-container'
        className='flex-1 overflow-y-auto p-4 bg-gray-300'
      >
        {messages.map(x => (
          <Message key={x._id} message={x} isOnline={onlineUsers.includes(x.senderId)} />
        ))}
      </div>
  );
};
