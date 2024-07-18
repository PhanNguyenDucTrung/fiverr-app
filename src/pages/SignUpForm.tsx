import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import axiosInstance from '../utils/api';

const SignUpForm: React.FC = () => {
    const onFinish = async (values: any) => {
        try {
            const response = await axiosInstance.post('/auth/signup', values);
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
        <div className='signup'>
            <div className='signup__container'>
                <div className='signup__form-wrapper'>
                    <div className='signup__logo'>
                        <Link to='/'>
                            <img
                                src='https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png'
                                className='signup__logo-img'
                                alt='Logo'
                            />
                        </Link>
                    </div>
                    <div className='signup__header'>
                        <h1 className='signup__title'>Create your account</h1>
                        <p className='signup__text'>
                            Have an account?{' '}
                            <Link to='/login' className='signup__link'>
                                Log in now
                            </Link>
                        </p>
                    </div>
                    <div className='signup__content'>
                        <div className='signup__social-login'>
                            <button className='signup__google-btn'>
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
                                <span className='signup__google-text'>Sign Up with Google</span>
                            </button>
                        </div>

                        <div className='signup__divider'>
                            <div className='signup__divider-text'>Or sign up with e-mail</div>
                        </div>

                        <Form
                            name='register'
                            className='signup__form'
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Form.Item
                                name='username'
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input
                                    prefix={<UserOutlined className='site-form-item-icon' />}
                                    placeholder='Username'
                                    className='signup__input'
                                />
                            </Form.Item>
                            <Form.Item
                                name='email'
                                rules={[
                                    { required: true, message: 'Please input your email!' },
                                    { type: 'email', message: 'Please enter a valid email!' },
                                ]}>
                                <Input
                                    prefix={<MailOutlined className='site-form-item-icon' />}
                                    placeholder='Email'
                                    className='signup__input'
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                    { min: 6, message: 'Password must be at least 6 characters' },
                                ]}>
                                <Input.Password
                                    prefix={<LockOutlined className='site-form-item-icon' />}
                                    placeholder='Password'
                                    className='signup__input signup__input--mt'
                                />
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
                                    <span className='signup__submit-text'>Sign Up</span>
                                </button>
                            </Form.Item>
                        </Form>
                        <p className='signup__terms'>
                            I agree to abide by templatana's
                            <a href='#' className='signup__terms-link'>
                                Terms of Service
                            </a>
                            and its
                            <a href='#' className='signup__terms-link'>
                                Privacy Policy
                            </a>
                        </p>
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

export default SignUpForm;
