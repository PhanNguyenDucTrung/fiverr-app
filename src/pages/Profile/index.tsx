import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination, Empty, Button, Divider, App as AntdApp } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import axiosInstance from '../../utils/api';
import { fetchUserProfile } from '../../redux/reducers/authSlice';
import ServiceItem from '../../components/ServiceItem';
import { Service } from '../../pages/JobList';
import { useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { notification } = AntdApp.useApp();
    const [profileData, setProfileData] = useState<any>(null);
    const { profile } = useAppSelector(state => state.authReducer);
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

    const refetchProfile = async () => {
        try {
            await dispatch(fetchUserProfile());
        } catch (error) {
            console.error('Error refetching profile:', error);
        }
    };

    const handleLike = async (serviceId: string) => {
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/like`);
            if (response.status === 200) {
                notification.success({ message: 'Service liked successfully' });
                await refetchProfile();
            }
        } catch (error) {
            console.error('Error liking service:', error);
        }
    };

    const handleUnlike = async (serviceId: string) => {
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/unlike`);
            if (response.status === 200) {
                notification.success({ message: 'Service unliked successfully' });
                await refetchProfile();
            }
        } catch (error) {
            console.error('Error unliking service:', error);
        }
    };

    const isLiked = (serviceId: string) => {
        return likedServices.some(service => service.id === serviceId);
    };

    const handlePageChange = (page: number) => {
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
                        <ProfileDetails profileData={profileData} setProfileData={setProfileData} loading={loading} />
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
