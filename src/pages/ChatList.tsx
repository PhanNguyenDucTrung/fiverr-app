import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { List, Avatar, Typography, Input, AutoComplete } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/api';
import { ChatPreview } from '../models/ChatPreview';
import { User } from '../models/Message';
import io from 'socket.io-client';

const { Text, Title } = Typography;
const { Search } = Input;

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

interface ChatListProps {
    onUserSelect: (user: User) => void;
}

const ChatList = forwardRef(({ onUserSelect }: ChatListProps, ref) => {
    const [chats, setChats] = useState<ChatPreview[]>([]);
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const fetchChats = async () => {
        try {
            const response = await axiosInstance.get<ChatPreview[]>('/messages');
            setChats(response.data);
        } catch (error) {
            console.error('Error fetching chat list:', error);
        }
    };

    useImperativeHandle(ref, () => ({
        fetchChats,
    }));

    useEffect(() => {
        fetchChats();

        socket.on('newMessage', () => {
            fetchChats();
        });

        return () => {
            socket.off('newMessage');
        };
    }, []);

    const handleSearch = async (query: string) => {
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        try {
            const response = await axiosInstance.get<User[]>('/users/search', {
                params: { query },
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleSelect = (value: string) => {
        const selectedUser = searchResults.find(user => user.username === value);
        if (selectedUser) {
            onUserSelect(selectedUser);
        }
    };

    return (
        <div
            style={{
                maxWidth: '400px',
                maxHeight: '100vh',
                overflowY: 'scroll',
            }}>
            <Title level={4}>Contacts</Title>
            <AutoComplete
                options={searchResults.map(user => ({ value: user.username, label: user.username }))}
                onSearch={handleSearch}
                onSelect={handleSelect}
                style={{ marginBottom: '20px', width: '100%' }}>
                <Search placeholder='Search contacts' prefix={<UserAddOutlined />} />
            </AutoComplete>
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
});

export default ChatList;
