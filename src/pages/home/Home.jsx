import {Sidebar} from "../../components/Sidebar/Sidebar.jsx"
import MessagesContainer from '../../components/Message/MessagesContainer.jsx'
import { useGlobalContext } from "../../context/useContext.jsx"
import { useSelector } from "react-redux"

export const Home = () => {
  const {globalState}=useGlobalContext();
  const messages=useSelector(state=>state.chatReducer.messages);
  if(globalState.debug)
  console.log("Use selectors",messages);
  return (
    <div className=" border-gray-400 border-solid w-5/6 flex" style={{height:"90%"}}>
        <div className='text-3xl font-semibold' style={{position:'absolute',top:'20px',right:'50px'}}>Hello {globalState.userName}</div>
        <Sidebar/>
        <MessagesContainer/>
    </div>
  )
}