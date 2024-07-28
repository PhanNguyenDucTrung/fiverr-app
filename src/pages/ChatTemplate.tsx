import React, { useState, useRef } from 'react';
import { Layout } from 'antd';
import ChatList from './ChatList';
import Chat from './Chat';
import { User } from '../models/Message';

const { Sider, Content } = Layout;

const ChatTemplate: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const chatListRef = useRef<{ fetchChats: () => void } | null>(null);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    const handleNewMessage = () => {
        if (chatListRef.current) {
            chatListRef.current.fetchChats();
        }
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={400} style={{ background: '#fff', padding: '10px' }}>
                <ChatList ref={chatListRef} onUserSelect={handleUserSelect} />
            </Sider>
            <Content style={{ padding: '20px', background: '#fff' }}>
                {selectedUser ? (
                    <Chat key={selectedUser.id} user={selectedUser} onNewMessage={handleNewMessage} />
                ) : (
                    <div>Select a chat to start messaging</div>
                )}
            </Content>
        </Layout>
    );
};

export default ChatTemplate;
