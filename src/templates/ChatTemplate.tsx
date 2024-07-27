import React, { useState } from 'react';
import { Layout } from 'antd';
import ChatList from '../pages/ChatList';
import Chat from '../pages/Chat';
import { User } from '../models/Message';

const { Sider, Content } = Layout;

const ChatTemplate: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    return (
        <Layout style={{ height: '100vh' }}>
            <Sider width={300} style={{ background: '#fff' }}>
                <ChatList onUserSelect={handleUserSelect} />
            </Sider>
            <Content style={{ padding: '20px', background: '#fff' }}>
                {selectedUser ? (
                    <Chat key={selectedUser.id} user={selectedUser} />
                ) : (
                    <div>Select a chat to start messaging</div>
                )}
            </Content>
        </Layout>
    );
};

export default ChatTemplate;
