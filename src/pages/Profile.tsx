import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, Divider, Skeleton, Form, Input, Button, Modal, notification, Upload } from 'antd';
import { UserOutlined, UploadOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState<any>(null);
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            const fakeProfile = {
                name: 'John Doe',
                role: 'Frontend Developer',
                email: 'john.doe@example.com',
                address: 'New York, USA',
                phone: '(123) 456-7890',
                avatar: '', // Placeholder for avatar URL
            };
            setProfileData(fakeProfile);
            setLoading(false);
        }, 1500);
    }, []);

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
        setIsEditing(false);
        notification.success({
            message: 'Profile updated successfully',
        });
        // Add save profile logic here
    };

    const handleDeleteAccount = () => {
        setIsModalVisible(true);
    };

    const handleConfirmDelete = () => {
        setIsModalVisible(false);
        notification.success({
            message: 'Account deleted successfully',
        });
        // Add delete account logic here
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
    };

    const handleAvatarChange = (info: any) => {
        if (info.file.status === 'done') {
            // Get the uploaded file URL and update profile data
            const avatarUrl = URL.createObjectURL(info.file.originFileObj);
            setProfileData({ ...profileData, avatar: avatarUrl });
            notification.success({
                message: 'Avatar uploaded successfully',
            });
            setIsAvatarModalVisible(false);
        }
    };

    const showAvatarModal = () => {
        setIsAvatarModalVisible(true);
    };

    const handleAvatarModalCancel = () => {
        setIsAvatarModalVisible(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Card style={{ maxWidth: '500px', width: '100%' }}>
                <Skeleton loading={loading} avatar active>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                        <div
                            style={{
                                position: 'relative',
                            }}>
                            <Avatar size={100} src={profileData?.avatar} icon={<UserOutlined />}></Avatar>{' '}
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
                    <Form form={form} layout='vertical'>
                        <Form.Item label='Tên'>
                            {isEditing ? <Input defaultValue={profileData?.name} /> : <Text>{profileData?.name}</Text>}
                        </Form.Item>
                        <Form.Item label='Email'>
                            {isEditing ? (
                                <Input defaultValue={profileData?.email} />
                            ) : (
                                <Text>{profileData?.email}</Text>
                            )}
                        </Form.Item>
                        <Form.Item label='Địa chỉ'>
                            {isEditing ? (
                                <Input defaultValue={profileData?.address} />
                            ) : (
                                <Text>{profileData?.address}</Text>
                            )}
                        </Form.Item>
                        <Form.Item label='Số điện thoại'>
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
                        visible={isModalVisible}
                        onOk={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                        okText='Delete'
                        okButtonProps={{ danger: true }}>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                    </Modal>
                    <Modal
                        zIndex={10000}
                        title='Update Avatar'
                        visible={isAvatarModalVisible}
                        onCancel={handleAvatarModalCancel}
                        footer={null}>
                        <div style={{ textAlign: 'center' }}>
                            <Avatar size={128} src={profileData?.avatar} icon={<UserOutlined />} />
                            <Upload
                                name='avatar'
                                showUploadList={false}
                                action='/upload' // This should be your upload URL
                                onChange={handleAvatarChange}>
                                <Button icon={<UploadOutlined />} style={{ marginTop: 20 }}>
                                    Upload Avatar
                                </Button>
                            </Upload>
                        </div>
                    </Modal>
                </Skeleton>
            </Card>
        </div>
    );
};

export default Profile;
