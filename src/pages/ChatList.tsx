import { useEffect, useState } from 'react';
import { List, Avatar, Typography } from 'antd';
import axiosInstance from '../utils/api';
import { ChatPreview } from '../models/ChatPreview';
import { User } from '../models/Message';

const { Text } = Typography;

interface ChatListProps {
    onUserSelect: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onUserSelect }) => {
    const [chats, setChats] = useState<ChatPreview[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axiosInstance.get<ChatPreview[]>('/messages');
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chat list:', error);
            }
        };

        fetchChats();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '300px' }}>
            <List
                itemLayout='horizontal'
                dataSource={chats}
                renderItem={chat => (
                    <List.Item key={chat.user.id} onClick={() => onUserSelect(chat.user)}>
                        <List.Item.Meta
                            avatar={<Avatar src={chat.user.profilePicture} />}
                            title={chat.user.username}
                            description={chat.lastMessage}
                        />
                        <Text>{new Date(chat.timestamp).toLocaleString()}</Text>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ChatList;
