import {ADD_MESSAGE,SET_CONV,AddMessage,SetConv, ChatAction } from "./action.ts";
import {Message,Messages} from "./types.ts";


const initialState:Messages ={
    messages:[],
}

const chatReducer=(state=initialState,action:ChatAction)=>{
    switch(action.type){
        case(ADD_MESSAGE):{
            // export const AddMessage=(message:Message)=>({
            //     type: ADD_MESSAGE,
            //     payload: message
            // });

            //based on above code, action.payload will be message with will be of Message type.
        
            return {
                ...state,                   //Extra code. Just incase if we add any other data like id or someother thing in the initial state, we are making sure it will not be disturbed.
                messages:[...state.messages,action.payload]
            }
        }
            
        case(SET_CONV):{
            return {
                ...state,
                messages:action.payload
            };
        }
        default:
            return state;
    }
}

export default chatReducer;