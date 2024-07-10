import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Divider, Skeleton, Form, Input, Button, Modal, notification } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { useAppSelector } from '../redux/hooks';
import axiosInstance from '../utils/api';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<any>(null);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const { profile } = useAppSelector(state => state.authReducer);
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (!profile) {
            navigate('/login');
        }
        const fetchProfileData = () => {
            const fakeProfile = {
                name: 'John Doe',
                role: 'Frontend Developer',
                email: 'john.doe@example.com',
                address: 'New York, USA',
                phone: '(123) 456-7890',

                ...profile,
            };
            setProfileData(fakeProfile);
            setLoading(false);
        };

        setTimeout(fetchProfileData, 500);
    }, [profile]);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handlePasswordUpdate = () => {
        form.validateFields()
            .then(values => {
                console.log('Password data:', values);
                // Add fake password update logic here
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
                });
                // Add fake save profile logic here
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
            setLoading(false);
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
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ maxWidth: '500px', width: '100%' }}>
                <Skeleton loading={loading} avatar active>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <div style={{ position: 'relative' }}>
                            <Avatar size={100} src={profileData?.profilePicture} icon={<UserOutlined />}></Avatar>
                            <Button
                                type='primary'
                                shape='circle'
                                icon={<EditOutlined />}
                                style={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 10,
                                    transform: 'translate(50%, 50%)',
                                }}
                                onClick={showAvatarModal}
                            />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        {profileData && (
                            <>
                                <Title level={4}>{profileData.name}</Title>
                                <Text type='secondary'>{profileData.role}</Text>
                            </>
                        )}
                    </div>
                    <Divider>Thông tin cá nhân</Divider>
                    <Form form={form} layout='vertical' initialValues={profileData}>
                        <Form.Item name='name' label='Tên'>
                            {isEditing ? (
                                <Input defaultValue={profileData?.username} />
                            ) : (
                                <Text>{profileData?.username}</Text>
                            )}
                        </Form.Item>
                        <Form.Item name='email' label='Email'>
                            {isEditing ? (
                                <Input defaultValue={profileData?.email} />
                            ) : (
                                <Text>{profileData?.email}</Text>
                            )}
                        </Form.Item>
                        <Form.Item name='address' label='Địa chỉ'>
                            {isEditing ? (
                                <Input defaultValue={profileData?.address} />
                            ) : (
                                <Text>{profileData?.address}</Text>
                            )}
                        </Form.Item>
                        <Form.Item name='phone' label='Số điện thoại'>
                            {isEditing ? (
                                <Input defaultValue={profileData?.phone} />
                            ) : (
                                <Text>{profileData?.phone}</Text>
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
                    <Divider>Cập nhật mật khẩu</Divider>
                    <Form form={form} layout='vertical' onFinish={handlePasswordUpdate}>
                        <Form.Item
                            name='currentPassword'
                            label='Mật khẩu hiện tại'
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại!' }]}>
                            <Input.Password
                                name='currentPassword'
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name='newPassword'
                            label='Mật khẩu mới'
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}>
                            <Input.Password
                                name='newPassword'
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </Form.Item>
                        <Form.Item
                            name='confirmPassword'
                            label='Nhập lại mật khẩu mới'
                            rules={[
                                { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
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
                                Cập nhật mật khẩu
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
                            <input
                                type='file'
                                onChange={handleFileChange}
                                style={{ display: 'block', margin: '20px auto' }}
                            />
                        </div>
                    </Modal>
                </Skeleton>
            </Card>
        </div>
    );
};

export default Profile;
