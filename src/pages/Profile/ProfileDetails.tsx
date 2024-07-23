import React, { useState } from 'react';
import { Avatar, Typography, Divider, Skeleton, Form, Input, Button, Modal, App as AntdApp } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import axiosInstance from '../../utils/api';

const { Title, Text } = Typography;

const ProfileDetails: React.FC<{ profileData: any; setProfileData: (data: any) => void; loading: boolean }> = ({
    profileData,
    setProfileData,
    loading,
}) => {
    const { notification } = AntdApp.useApp();
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePasswordUpdate = () => {
        form.validateFields()
            .then(values => {
                console.log('Password data:', values);
                // Add password update logic here
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleSaveProfile = () => {
        form.validateFields()
            .then(values => {
                setProfileData({ ...profileData, ...values });
                setIsEditing(false);
                notification.success({
                    message: 'Profile updated successfully',
                    description: 'Your profile information has been updated.',
                });
                // Add save profile logic here
            })
            .catch(errorInfo => {
                console.log('Validation failed:', errorInfo);
            });
    };

    const handleDeleteAccount = () => {
        setIsModalVisible(true);
    };

    const handleConfirmDelete = () => {
        setIsModalVisible(false);
        notification.success({
            message: 'Account deleted successfully',
            description: 'Your account has been deleted.',
        });
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const handleSaveAvatar = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        try {
            const response = await axiosInstance.patch('/users/profile/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Avatar upload response:', response.data);
            setProfileData({ ...profileData, profilePicture: response.data.profilePicture });
            notification.success({
                message: 'Avatar uploaded successfully',
            });
        } catch (error) {
            notification.error({
                message: 'Failed to upload avatar',
            });
        } finally {
            setIsAvatarModalVisible(false);
            setAvatarPreview(null);
            setSelectedFile(null);
        }
    };

    const showAvatarModal = () => {
        setIsAvatarModalVisible(true);
    };

    const handleAvatarModalCancel = () => {
        setIsAvatarModalVisible(false);
        setAvatarPreview(null);
        setSelectedFile(null);
    };

    return (
        <Skeleton loading={loading} avatar active>
            <div className='profile-avatar-container'>
                <div className='avatar-wrapper'>
                    <Avatar className='profile-avatar' src={profileData?.profilePicture} icon={<UserOutlined />} />
                    <Button
                        className='edit-avatar-button'
                        type='primary'
                        shape='circle'
                        icon={<EditOutlined />}
                        onClick={showAvatarModal}
                    />
                </div>
            </div>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                {profileData && (
                    <>
                        <Title level={4}>{profileData.username}</Title>
                        <Text type='secondary'>{profileData.role}</Text>
                    </>
                )}
            </div>
            <Divider>Personal Information</Divider>
            <Form form={form} layout='vertical' initialValues={profileData}>
                <Form.Item name='name' label='Name'>
                    {isEditing ? <Input defaultValue={profileData?.username} /> : <Text>{profileData?.username}</Text>}
                </Form.Item>
                <Form.Item name='email' label='Email'>
                    {isEditing ? <Input defaultValue={profileData?.email} /> : <Text>{profileData?.email}</Text>}
                </Form.Item>
                <Form.Item name='address' label='Address'>
                    {isEditing ? (
                        <Input defaultValue={profileData?.address} />
                    ) : (
                        <Text>{profileData?.address || 'No address available'}</Text>
                    )}
                </Form.Item>
                <Form.Item name='phone' label='Phone Number'>
                    {isEditing ? (
                        <Input defaultValue={profileData?.phone} />
                    ) : (
                        <Text>{profileData?.phone || 'No phone number available'}</Text>
                    )}
                </Form.Item>
                {isEditing ? (
                    <Form.Item>
                        <Button type='primary' onClick={handleSaveProfile}>
                            Save Profile
                        </Button>
                        <Button style={{ marginLeft: '10px' }} onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </Form.Item>
                ) : (
                    <Form.Item>
                        <Button type='primary' onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                    </Form.Item>
                )}
            </Form>

            <Divider>Update Password</Divider>
            <Form form={form} layout='vertical' onFinish={handlePasswordUpdate}>
                <Form.Item
                    name='currentPassword'
                    label='Current Password'
                    rules={[{ required: true, message: 'Please enter your current password!' }]}>
                    <Input.Password
                        name='currentPassword'
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                    />
                </Form.Item>
                <Form.Item
                    name='newPassword'
                    label='New Password'
                    rules={[{ required: true, message: 'Please enter your new password!' }]}>
                    <Input.Password
                        name='newPassword'
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                    />
                </Form.Item>
                <Form.Item
                    name='confirmPassword'
                    label='Confirm New Password'
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}>
                    <Input.Password
                        name='confirmPassword'
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
            <Divider />
            <Button danger onClick={handleDeleteAccount}>
                Delete Account
            </Button>
            <Modal
                title='Confirm Delete'
                open={isModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText='Delete'
                okButtonProps={{ danger: true }}>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            </Modal>
            <Modal
                zIndex={10000}
                title='Update Avatar'
                open={isAvatarModalVisible}
                onCancel={handleAvatarModalCancel}
                footer={[
                    <Button key='cancel' onClick={handleAvatarModalCancel}>
                        Cancel
                    </Button>,
                    <Button key='save' type='primary' onClick={handleSaveAvatar}>
                        Save Profile Picture
                    </Button>,
                ]}>
                <div style={{ textAlign: 'center' }}>
                    {avatarPreview ? (
                        <Avatar size={128} src={avatarPreview} icon={<UserOutlined />} />
                    ) : (
                        <Avatar size={128} src={profileData?.avatar} icon={<UserOutlined />} />
                    )}
                    <input type='file' onChange={handleFileChange} style={{ display: 'block', margin: '20px auto' }} />
                </div>
            </Modal>
        </Skeleton>
    );
};

export default ProfileDetails;
