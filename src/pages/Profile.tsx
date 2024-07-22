import React, { useState, useEffect } from 'react';
import {
    Card,
    Avatar,
    Typography,
    Divider,
    Skeleton,
    Form,
    Input,
    Button,
    Modal,
    App as AntdApp,
    Row,
    Col,
    Pagination,
    Empty,
} from 'antd';
import { UserOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import axiosInstance from '../utils/api';
import { fetchUserProfile } from '../redux/reducers/authSlice';
import ServiceItem from '../components/ServiceItem';
import { Service } from '../pages/JobList';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { notification } = AntdApp.useApp();
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
    const [likedServices, setLikedServices] = useState<Service[]>([]);
    const [associatedServices, setAssociatedServices] = useState<Service[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4);

    useEffect(() => {
        if (!profile) {
            dispatch(fetchUserProfile());
        } else {
            setProfileData(profile);
            setLoading(false);
            setLikedServices(profile.likedServices || []);
            fetchAssociatedServices(profile.id);
        }
    }, [profile, dispatch]);

    const fetchAssociatedServices = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}/services`);
            setAssociatedServices(response.data);
        } catch (error) {
            console.error('Error fetching associated services:', error);
        }
    };

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

    const handleLike = async (serviceId: string) => {
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/like`);
            if (response.status === 200) {
                notification.success({
                    message: 'Service liked successfully',
                });
                setLikedServices(prev => [...prev, response.data.service]);
            }
        } catch (error) {
            console.error('Error liking service:', error);
        }
    };

    const handleUnlike = async (serviceId: string) => {
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/unlike`);
            if (response.status === 200) {
                notification.success({
                    message: 'Service unliked successfully',
                });
                setLikedServices(prev => prev.filter(service => service.id !== serviceId));
            }
        } catch (error) {
            console.error('Error unliking service:', error);
        }
    };

    const isLiked = (serviceId: string) => likedServices.some(service => service.id === serviceId);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentServices = likedServices.slice(startIndex, endIndex);
    const currentAssociatedServices = associatedServices.slice(startIndex, endIndex);

    const handleCreateService = () => {
        navigate('/services/new');
    };

    return (
        <div className='profile-container max-width-container'>
            <Card style={{ width: '100%' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} xl={8}>
                        <Skeleton loading={loading} avatar active>
                            <div className='profile-avatar-container'>
                                <div className='avatar-wrapper'>
                                    <Avatar
                                        className='profile-avatar'
                                        src={profileData?.profilePicture}
                                        icon={<UserOutlined />}
                                    />
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
                                    <input
                                        type='file'
                                        onChange={handleFileChange}
                                        style={{ display: 'block', margin: '20px auto' }}
                                    />
                                </div>
                            </Modal>
                        </Skeleton>
                    </Col>
                    <Col xs={24} md={12} xl={16}>
                        <Divider>Liked Services</Divider>
                        <div className='profile-list'>
                            <div className='profile-listing-container grid-view'>
                                {currentServices.length > 0 ? (
                                    currentServices.map((service: Service) => (
                                        <ServiceItem
                                            key={service.id}
                                            service={service}
                                            isLiked={isLiked}
                                            handleLike={handleLike}
                                            handleUnlike={handleUnlike}
                                        />
                                    ))
                                ) : (
                                    <Empty description='No liked services available'>
                                        <Button type='primary' onClick={handleCreateService}>
                                            Browse Services
                                        </Button>
                                    </Empty>
                                )}
                            </div>
                            {currentServices.length > 0 && (
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={likedServices.length}
                                    onChange={handlePageChange}
                                    style={{ marginTop: '20px', textAlign: 'center' }}
                                />
                            )}
                        </div>
                        <Divider>
                            Associated Services
                            <Button
                                type='primary'
                                icon={<PlusOutlined />}
                                style={{ marginLeft: '10px' }}
                                onClick={handleCreateService}>
                                Create
                            </Button>
                        </Divider>
                        <div className='profile-list'>
                            <div className='profile-listing-container grid-view'>
                                {currentAssociatedServices.length > 0 ? (
                                    currentAssociatedServices.map((service: Service) => (
                                        <ServiceItem
                                            key={service.id}
                                            service={service}
                                            isLiked={isLiked}
                                            handleLike={handleLike}
                                            handleUnlike={handleUnlike}
                                        />
                                    ))
                                ) : (
                                    <Empty description='No services created by you yet'>
                                        <Button type='primary' icon={<PlusOutlined />} onClick={handleCreateService}>
                                            Create Service
                                        </Button>
                                    </Empty>
                                )}
                            </div>
                            {currentAssociatedServices.length > 0 && (
                                <Pagination
                                    current={currentPage}
                                    pageSize={pageSize}
                                    total={associatedServices.length}
                                    onChange={handlePageChange}
                                    style={{ marginTop: '20px', textAlign: 'center' }}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Profile;
