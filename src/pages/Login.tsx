import { Form, Input, Button, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        try {
            console.log(values);
            const response = await axios.post('http://localhost:3000/api/auth/login', values);
            console.log(response);

            if (response.status === 200) {
                message.success('Login successful!');
                localStorage.setItem('token', response.data.token);
                navigate('/admin');
            }
            // console.log(response.data);

            // Handle successful login, e.g., redirect to another page
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
