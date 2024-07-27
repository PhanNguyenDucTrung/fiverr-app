import { useEffect, useState } from 'react';
import axiosInstance from '../utils/api';
import { List, Input, Button, Avatar, Typography } from 'antd';
import io from 'socket.io-client';
import { Message } from '../models/Message';
import { User } from '../models/Message';

const { Text } = Typography;

const socket = io(`${import.meta.env.VITE_SOCKET_URL}`);

interface ChatProps {
    user: User;
}

const Chat: React.FC<ChatProps> = ({ user }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const [profile, setProfile] = useState<User | null>(null);

    useEffect(() => {
        const storedProfile = JSON.parse(localStorage.getItem('profile') || '{}') as User;
        setProfile(storedProfile);

        if (storedProfile && storedProfile.id) {
            socket.emit('join', storedProfile.id);

            const fetchMessages = async () => {
                try {
                    const response = await axiosInstance.get<Message[]>(`/messages/${user.id}`);
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };

            fetchMessages();

            socket.on('newMessage', (newMessage: Message) => {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            });

            return () => {
                socket.off('newMessage');
            };
        }
    }, [user.id]);

    const sendMessage = async () => {
        if (!profile) return;
        try {
            const response = await axiosInstance.post<Message>('/messages', {
                receiverId: user.id,
                message,
            });
            setMessages(prevMessages => [...prevMessages, response.data]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                <List
                    itemLayout='vertical'
                    dataSource={messages}
                    renderItem={msg => (
                        <List.Item
                            key={msg._id}
                            style={{
                                textAlign: msg.senderId.id === profile.id ? 'right' : 'left',
                                display: 'flex',
                                justifyContent: msg.senderId.id === profile.id ? 'flex-end' : 'flex-start',
                            }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.senderId.id === profile.id ? 'row-reverse' : 'row',
                                    alignItems: 'center',
                                    maxWidth: '70%',
                                }}>
                                <Avatar
                                    src={
                                        msg.senderId.id === profile.id
                                            ? profile.profilePicture
                                            : msg.senderId.profilePicture
                                    }
                                />
                                <div
                                    style={{
                                        backgroundColor: msg.senderId.id === profile.id ? '#0084ff' : '#f1f0f0',
                                        color: msg.senderId.id === profile.id ? 'white' : 'black',
                                        padding: '10px 15px',
                                        borderRadius: '20px',
                                        marginLeft: msg.senderId.id === profile.id ? '10px' : '0',
                                        marginRight: msg.senderId.id === profile.id ? '0' : '10px',
                                        display: 'inline-block',
                                        textAlign: 'left',
                                    }}>
                                    <Text style={{ color: msg.senderId.id === profile.id ? 'white' : 'black' }}>
                                        {msg.message}
                                    </Text>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                <Input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onPressEnter={sendMessage}
                    placeholder='Type a message'
                    style={{ flexGrow: 1, marginRight: '10px' }}
                />
                <Button type='primary' onClick={sendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default Chat;
