import { Message } from './Message.jsx'
import { fetchMessages } from "../../reduxStore/chatSlice.ts"
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react"
import { useGlobalContext } from '../../context/useContext.jsx';

export const Messages = () => {
  const {globalState}=useGlobalContext();
  if(globalState.debug)
  console.log("GlobalState from Messages component ",globalState);
  const dispatch=useDispatch();
  const messages=useSelector(state=>state.chatReducer.messages);
  useEffect(()=>{
    const fetchData = async () => {
      dispatch(fetchMessages(globalState.friendId));
    };
    fetchData();
  },[dispatch,globalState.friendId]);

  if(globalState.debug)
  console.log("Messages from Messages component",messages);



  return (
    <div className='overflow-y-scroll p-4 bg-gray-300 scroll-m-1 bg-scroll'>
      {messages.map(x=>(
        <Message key={x._id} message={x}/>
      ))}
      {/* <Message key={messages[0]._id} message={messages[0]}/> */}
    </div>
  )
}

/*
        <Message name="KabKas"/>
        <Message name="Mahlk"/>
        <Message name="alfdjls"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>
        <Message name="KabKas"/>

*/