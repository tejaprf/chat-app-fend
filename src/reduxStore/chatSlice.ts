import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Message, Messages } from "./types";
import api from "../apis.jsx"
import { formatISO } from 'date-fns';
import { useGlobalContext } from "../context/useContext.jsx";

const initialState: Messages = { messages: [] };

/*
createAsyncThunk < Returned, ThunkArg = void> (typePrefix: string, payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, AsyncThunkConfig>, options ?: AsyncThunkOptions<ThunkArg, AsyncThunkConfig> | undefined): AsyncThunk<Returned, ThunkArg, AsyncThunkConfig>


generic syntax for createAsyncThunk

createAsyncThunk<returntype,arguement type,('path used in bind',async function(arguement with the arguement type specified before))

arguement type can be of any type. It can be object as well. If you want to use single arguement for async function of type x, specify the same type in the arguement type.

if you want to use multiple arguements, then use object with multiple times and in async function pass the same object.

In below function Messages is return type, string is arguement type of arguement used in the async function.


*/


export const fetchMessages = createAsyncThunk<Messages, String>('chat/fetchMessages', async (userId) => {

    const res = await api.get(`message/${userId}`);     //X loggedin, X chatting with Y, to get messages passing userid of y and userid of x will be automatically picked from cookies in the middleware in server.
    console.log(res.data);
    return {messages:res.data};

});

/*
 router.post('/send/:id',protectRoute,sendMessage);  for sending message and adding it to db, we should use this api. :id is receiver Id
 body.message should have messageData string.
 export const sendMessage=async (req,res)=>{
    console.log("Send Message");
    try{
        const {id:receiverId}=req.params;           //defined in route /send/:id or const id=req.params.id
        const senderId=req.user._id;           //assigned it in middle ware.
        const message=req.body.message;
    }
*/
export const addMessage = createAsyncThunk<Message, { userId: String, messageData: String }>('chat/addMessage', async ({ messageData, userId }) => {

    const res = await api.post(`/message/send/${userId}`, { message: messageData });
    // return { senderId: userId, message: messageData, createdAt: formatISO(new Date(), { representation: 'complete' }) };

    // console.log('Add message   ',{messageData,userId})
    // console.log('Add message res.data ',res.data);
 
    return res.data.messageVal;
});

//adding message received from user through socket
export const addMessageRec = createAsyncThunk<Message,Message>('chat/addMessageRec', async (messageData) => {

return messageData;
});



/*
PayloadAction
Definition: PayloadAction is a generic type provided by Redux Toolkit that represents an action with a payload. It is typically used to type the action objects in Redux slices.

Structure: It generally has a payload property that holds the data being dispatched i.e it defines what you should recieve then this action is called. For example, if you fetch messages using fetchMessages function which we have created above using createAsyncThunk, when this fetchMessages function runs(i.e called somewhere) successfully and returns the data, it should be of the type <Messages> which we defined in the payloadAction.


.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Messages>) => {
    required action logic
}
fetchMessages.fulfilled: This represents the action that is dispatched when the fetchMessages async thunk is fulfilled, meaning that the API request for fetching messages was successful.

state: This is the current state of the Redux slice that is being updated by this action.

action: This is the action object dispatched when the thunk is fulfilled. It has a payload property that contains the data returned from the API call. Action is basically the fetchMessages function.

Our requirement is to store the data recieved in the redux store. This part we implement in the action.

PayloadAction<Messages>: This indicates that the action object will have a payload property of type Messages. Messages is likely a TypeScript type or interface that represents the shape of the messages data.

*/


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Messages>) => {

            state.messages = action.payload.messages; // Assuming payload is of type { messages: Message[] }
            //we action.payload is value which is returned from fetchMessages. We are returning array of messages inside an object with messages property. {messages:[message,message,..]}. If it is directly array, we can directly assign with action.payload.
        })
            .addCase(fetchMessages.rejected, (state, action) => {
                console.log('Error in fetching messages');
            })
            .addCase(addMessage.fulfilled, (state, action: PayloadAction<Message>) => {
                state.messages.push(action.payload);                //we are returning only one message. So action.payload itself is message.
            })
            .addCase(addMessage.rejected, (state, action) => {
                console.log('Error in adding message',action.payload);
            })
            .addCase(addMessageRec.fulfilled, (state, action: PayloadAction<Message>) => {
                state.messages.push(action.payload);                //we are returning only one message. So action.payload itself is message.
                console.log("Messages from chatslice ",state.messages)
            })
            .addCase(addMessageRec.rejected, (state, action) => {
                console.log('Error in adding received message',action.payload);
            })
    }
})

export default chatSlice.reducer;