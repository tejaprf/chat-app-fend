// import {AddMessage,GetConv,ChatAction} from "./actiontype.ts"


import {Message,Messages} from "./types.ts";

export const ADD_MESSAGE='ADD_MESSAGE';
export const SET_CONV='SET_CONV';


//payload is commonly used as key. We can use other keys as well like data ..etc
// interface AddMessage {
//     type: typeof ADD_MESSAGE,
//     payload:Message
// }

// interface GetConv {
//     type: typeof GET_CONV,
//     payload: Messages
// }

// export type ChatAction = AddMessage | GetConv;


// Javascript arrow functions automatically return the object. In TypeScript (and JavaScript), when you define a function like this, it will return the object literal that you construct within it.
export const AddMessage=(message:Message)=>({
    type: ADD_MESSAGE,
    payload: message
});

export const SetConv=(messages:Messages)=>({
    type:SET_CONV,
    payload:messages
});

export type ChatAction= ReturnType<typeof AddMessage> | ReturnType<typeof SetConv>;    //using it for return type in reducers

