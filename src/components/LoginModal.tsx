// components/LoginModal.tsx
import React from 'react';
import { Modal } from 'antd';
import LoginForm from '../pages/LoginForm';

interface LoginModalProps {
    visible: boolean;
    onCancel: () => void;
    onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onCancel, onLoginSuccess }) => {
    return (
        <Modal title='' open={visible} width={900} onCancel={onCancel} footer={null} closable={false}>
            <LoginForm onLoginSuccess={onLoginSuccess} />
        </Modal>
    );
};

export default LoginModal;
