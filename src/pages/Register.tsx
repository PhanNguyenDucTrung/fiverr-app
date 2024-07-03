import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Register: React.FC = () => {
    const onFinish = async (values: any) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', values);
            message.success(response.data.message);
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error('An error occurred. Please try again.');
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Register</h2>
            <Form
                name='register'
                layout='vertical'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'>
                <Form.Item
                    label='Username'
                    name='username'
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters' },
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
