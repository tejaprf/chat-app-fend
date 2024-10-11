import { createContext,useContext,useEffect,useState } from "react";
import { useGlobalContext } from "./useContext";
import { io } from "socket.io-client";

const GlobalContext=createContext();

export const SocketContextProvider=({children})=>{


    const [onlineUsers,setOnlineUsers]=useState([]);
    const [socket,setSocket]=useState();

    const {globalState}=useGlobalContext();

    useEffect(()=>{
        if(globalState.isAuth){
            console.log(globalState)
            // import.meta.env.VITE_BACKEND_URL
            const socket=io(import.meta.env.VITE_BACKEND_URL,{query:{
                userId: globalState.id,
            }});
            setSocket(socket)

            socket.on("getOnlineUsers",(users)=>{
                console.log("Online users are",users)
                setOnlineUsers(users);
            })

            return ()=>socket.close();
        }else{
            if(socket)
                {
                    socket.close();
                    setSocket(null);
                }
        }
    },[globalState.isAuth]);

    

    return <GlobalContext.Provider value={{socket,setSocket,onlineUsers}}>
            {children}
        </GlobalContext.Provider>
}

export const useSocketContext= () => useContext(GlobalContext);