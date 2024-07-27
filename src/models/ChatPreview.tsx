import { User } from './Message';

export interface ChatPreview {
    user: User; // The other user in the chat
    lastMessage: string; // The last message in the chat
    timestamp: Date; // The timestamp of the last message
}
