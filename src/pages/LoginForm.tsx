import React, { useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setToken } from '../redux/reducers/authSlice';
import axiosInstance from '../utils/api';
interface LoginFormProps {
    onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { user } = result;
            const idToken = await user.getIdToken(); // Ensure this retrieves the Firebase ID token

            // Send token to your backend to verify and create session
            const response = await axiosInstance.post(
                '/auth/google-auth',
                {}, // data can be an empty object or any necessary payload
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${idToken}`, // Ensure this sends the correct ID token
                    },
                }
            );

            const data = response.data;
            console.log('Google login data', data);
            dispatch(setToken(data.token));
            message.success('Login successful!');
            onLoginSuccess(); // Call onLoginSuccess after successful login

            navigate('/');
        } catch (error) {
            console.error('Error during Google login', error);
            message.error('Login failed. Please try again.');
        }
    };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const role = useAppSelector(state => state.authReducer.role);

    useEffect(() => {
        if (role === 'admin') {
            navigate('/admin/users');
        }
        if (role === 'user') {
            navigate('/');
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
        <div className='signup'>
            <div className='signup__container'>
                <div className='signup__form-wrapper'>
                    <div className='signup__logo'>
                        <Link to='/'>
                            <img
                                src='https://logowik.com/content/uploads/images/fiverr-new3326.jpg'
                                className='signup__logo-img'
                                alt='Logo'
                            />
                        </Link>
                    </div>
                    <div className='signup__header'>
                        <h1 className='signup__title'>Log in to your account</h1>
                        <p className='signup__text'>
                            Don't have an account?{' '}
                            <Link to='/signup' className='signup__link'>
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    <div className='signup__content'>
                        <div className='signup__social-login'>
                            <button className='signup__google-btn' onClick={handleGoogleLogin}>
                                <div className='signup__google-icon-wrapper'>
                                    <svg className='signup__google-icon' viewBox='0 0 533.5 544.3'>
                                        <path
                                            d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                                            fill='#4285f4'
                                        />
                                        <path
                                            d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                                            fill='#34a853'
                                        />
                                        <path
                                            d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                                            fill='#fbbc04'
                                        />
                                        <path
                                            d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                                            fill='#ea4335'
                                        />
                                    </svg>
                                </div>
                                <span className='signup__google-text'>Login with Google</span>
                            </button>
                        </div>

                        <div className='signup__divider'>
                            <div className='signup__divider-text'>Or log in with e-mail</div>
                        </div>

                        <Form
                            name='login_form'
                            className='signup__form'
                            initialValues={{ remember: true }}
                            onFinish={onFinish}>
                            <Form.Item name='email' rules={[{ required: true, message: 'Please input your Email!' }]}>
                                <Input
                                    prefix={<UserOutlined className='site-form-item-icon' />}
                                    placeholder='Email'
                                    className='signup__input'
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <Input
                                    prefix={<LockOutlined className='site-form-item-icon' />}
                                    type='password'
                                    placeholder='Password'
                                    className='signup__input signup__input--mt'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name='remember' valuePropName='checked' noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a className='login-form-forgot' href=''>
                                    Forgot password?
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <button type='submit' className='signup__submit-btn'>
                                    <svg
                                        className='signup__submit-icon'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'>
                                        <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                                        <circle cx='8.5' cy='7' r='4' />
                                        <path d='M20 8v6M23 11h-6' />
                                    </svg>
                                    <span className='signup__submit-text'>Log in</span>
                                </button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className='signup__image-container'>
                    <div
                        className='signup__image'
                        style={{
                            backgroundImage:
                                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
                        }}></div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
