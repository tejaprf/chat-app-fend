// "_id": "66895f84091e3477de23834a",
// "senderId": "668957af5f4f14c990a07e6e",
// "receiverId": "668957a95f4f14c990a07e69",
// "message": "hello kabuto",
// "createdAt": "2024-07-06T15:15:16.515Z",
// "updatedAt": "2024-07-06T15:15:16.515Z",


// Type Checking: TypeScript will give you warnings or errors if you try to use a value in a way that doesn't conform to its type at compile time. However, if the API response includes extra fields, TypeScript won't reject it as long as the required fields are present when storing in the store.

export interface Message {
    senderId:String,
    message:String,
    createdAt:String
};

export interface Messages{
    messages: Message[]
};


