// types.ts
export interface User {
    id: string;
    username: string;
    profilePicture?: string;
}

export interface Message {
    _id: string;
    senderId: {
        id: string;
        username: string;
        profilePicture?: string;
    };
    receiverId: string;
    message: string;
    timestamp: string;
}
