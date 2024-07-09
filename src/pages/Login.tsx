import { Form, Input, Button, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../redux/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import axiosInstance from '../utils/api';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const role = useAppSelector(state => state.authReducer.role);

    useEffect(() => {
        if (role === 'admin') {
            navigate('/admin/users');
        }
    }, [role, navigate]);

    const onFinish = async (values: any) => {
        try {
            const response = await axiosInstance.post('/auth/login', values);

            if (response.status === 200) {
                message.success('Login successful!');
                dispatch(setToken(response.data.token));
            }
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='login-container'>
            <Form name='login_form' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
                <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
                    <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
                </Form.Item>
                <Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input
                        prefix={<LockOutlined className='site-form-item-icon' />}
                        type='password'
                        placeholder='Password'
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a className='login-form-forgot' href=''>
                        Forgot password
                    </a>
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
