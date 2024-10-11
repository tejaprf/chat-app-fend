import React from 'react'
import Avatar from 'react-avatar'
import { useGlobalContext } from '../../context/useContext'


export const Message = (props) => {
    const {globalState,setGlobalState}=useGlobalContext();
    const message=props.message;

    if(globalState.debug)
    console.log("Message from Message component ",message);


    // Create a Date object
    const date = new Date(message.createdAt);
    const istTime=new Date(date.getTime()+5.5*60*60*1000)

    // Extract hours, minutes, and seconds
    const hours = istTime.getUTCHours(); // For UTC time
    const minutes = istTime.getUTCMinutes();


    // Format time as a string (e.g., "10:04:43")
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    // console.log(props)
    
    return (
        <div className='w-full'>
            <div className={message.senderId===globalState.id?"chat chat-end":"chat chat-start"}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <Avatar name={message.senderId===globalState.id?globalState.userName:globalState.friendName} size="40" className={`rounded-full w-4 h-4 avatar ${props.isOnline?"online":""}`}/>
                </div>
            </div>
            <div className="chat-header text-gray-700">
                {message.senderId===globalState.id?globalState.userName:globalState.friendName}
                <time className="text-xs opacity-80 text-gray-700">{timeString}</time>
            </div>
            <div className="chat-bubble">{message.message}</div>
            <div className="chat-footer opacity-80 text-gray-700">Delivered</div>
            </div>
            
        </div>
    )
}



/*

<div className='w-full'>
<div className={props.id===globalState.id?"chat chat-end":"chat chat-start"}>
<div className="chat-image avatar">
    <div className="w-10 rounded-full">
        <Avatar name={props.name} size="40" className='rounded-full w-4 h-4 avatar online'/>
    </div>
</div>
<div className="chat-header text-gray-700">
    Obi-Wan Kenobi
    <time className="text-xs opacity-80 text-gray-700">12:45</time>
</div>
<div className="chat-bubble">You were the Chosen One!</div>
<div className="chat-footer opacity-80 text-gray-700">Delivered</div>
</div>
<div className="chat chat-end">
<div className="chat-image avatar">
    <div className="w-10 rounded-full">
    <Avatar name={props.name} size="40" className='rounded-full w-4 h-4 avatar online'/>

    </div>
</div>
<div className="chat-header text-gray-700">
    Anakin
    <time className="text-xs opacity-80 text-gray-700">12:46</time>
</div>
<div className="chat-bubble">I hate you!</div>
<div className="chat-footer opacity-80 text-gray-700" >Seen at 12:46</div>
</div>
</div>

*/