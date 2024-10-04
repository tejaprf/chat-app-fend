/*
// Action Types
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_COUNT = 'SET_COUNT';

// Action Creators
export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const setCount = (count) => ({
  type: SET_COUNT,
  payload: count,
});




import { SET_MESSAGE } from '../actions';

const initialState = {
  message: 'Hello, World!',
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default exampleReducer;

*/




// import {Message,Messages} from "./types.ts";

// const ADD_MESSAGE='ADD_MESSAGE';
// const GET_CONV='GET_CONV';


// //payload is commonly used as key. We can use other keys as well like data ..etc
// interface AddMessage {
//     type: typeof ADD_MESSAGE,
//     payload:Message
// }

// interface GetConv {
//     type: typeof GET_CONV,
//     payload: Messages
// }

// export type ChatAction = AddMessage | GetConv;