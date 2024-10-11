import { Messages } from './Messages'
import MessageInput from './MessageInput'
import { useGlobalContext } from '../../context/useContext'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const MessagesContainer = () => {
  const {globalState}=useGlobalContext();

  const messages=useSelector(state=>state.chatReducer.messages);
  

  useEffect(() => {
    const container = document.getElementById('message-container');
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to bottom
      console.log("Scrolled to bottom");
    } else {
      console.log("Container not found");
    }
  }, [messages]);
  return (
    <div className='w-full h-full flex flex-col border-2 border-l-0 border-gray-400 bg-gray-300'>
        <div className='label-text p-2 text-left border-b-2 border-gray-400 bg-gray-800'>
            <span>To: </span><span className='text-gray-400 text-xl font-bold pl-2'>{globalState.friendName}</span>
        </div>
        <div className='flex-1 overflow-y-scroll' id='message-container'>
          <Messages/>
        </div>
        <MessageInput />

    </div>
  )
}

export default MessagesContainer