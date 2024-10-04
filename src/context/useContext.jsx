import { createContext,useContext,useState} from "react";

const GlobalContext=createContext();


// eslint-disable-next-line react/prop-types
export const GlobalContextProvider=({ children })=>{
    const [globalState,setGlobalState]=useState({
        id:'',
        friendId:'',
        userName:'',
        fullName:'',
        friendName:'',
        isAuth:false,
        friends:[],
        debug:true
    })
    return <GlobalContext.Provider value={{globalState,setGlobalState}}>
        {children}
    </GlobalContext.Provider>
}
export const useGlobalContext=()=>useContext(GlobalContext);