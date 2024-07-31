import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination, Empty, Button, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import axiosInstance from '../../utils/api';
import { fetchUserProfile } from '../../redux/reducers/authSlice';
import ServiceItem from '../../components/ServiceItem';
import { Service } from '../../models/Service';
import { useNavigate } from 'react-router-dom';
import ProfileDetails from './ProfileDetails';
import useAuth from '../../hooks/useAuth';
import { useServiceLike } from '../../hooks/useServiceLike';

const Profile: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { handleLike, handleUnlike, isLiked } = useServiceLike();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [profileData, setProfileData] = useState<any>(null);
    const { profile } = useAppSelector(state => state.authReducer);
    console.log(profile);
    const [associatedServices, setAssociatedServices] = useState<Service[]>([]);
    const [likedCurrentPage, setLikedCurrentPage] = useState(1);
    const [associatedCurrentPage, setAssociatedCurrentPage] = useState(1);
    const [pageSize] = useState(4);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (!profile) {
            dispatch(fetchUserProfile());
        } else {
            setProfileData(profile);
            setLoading(false);
            fetchAssociatedServices(profile.id);
        }
    }, [profile, isAuthenticated, dispatch]);

    const fetchAssociatedServices = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/users/${userId}/services`);
            setAssociatedServices(response.data);
        } catch (error) {
            console.error('Error fetching associated services:', error);
        }
    };

    const handleLikedPageChange = (page: number) => {
        setLikedCurrentPage(page);
    };

    const handleAssociatedPageChange = (page: number) => {
        setAssociatedCurrentPage(page);
    };

    const likedStartIndex = (likedCurrentPage - 1) * pageSize;
    const likedEndIndex = likedStartIndex + pageSize;
    const currentLikedServices = profile?.likedServices?.slice(likedStartIndex, likedEndIndex) || [];

    const associatedStartIndex = (associatedCurrentPage - 1) * pageSize;
    const associatedEndIndex = associatedStartIndex + pageSize;
    const currentAssociatedServices = associatedServices.slice(associatedStartIndex, associatedEndIndex);

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
                                {currentLikedServices.length > 0 ? (
                                    currentLikedServices.map((service: Service) => (
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
                            {currentLikedServices.length > 0 && (
                                <Pagination
                                    current={likedCurrentPage}
                                    pageSize={pageSize}
                                    total={profile?.likedServices?.length || 0}
                                    onChange={handleLikedPageChange}
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
                                    current={associatedCurrentPage}
                                    pageSize={pageSize}
                                    total={associatedServices.length}
                                    onChange={handleAssociatedPageChange}
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
