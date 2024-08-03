import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination, Empty, Button, Divider, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchUserProfile } from '../../redux/reducers/authSlice';
import axiosInstance from '../../utils/api';
import useAuth from '../../hooks/useAuth';
import { useServiceLike } from '../../hooks/useServiceLike';
import { Service } from '../../models/Service';
import ServiceItem from '../../components/ServiceItem';
import ProfileDetails from './ProfileDetails';

// Định nghĩa kiểu dữ liệu cho Profile
interface Profile {
    id: string;
    likedServices: Service[];
    // thêm các thuộc tính khác của hồ sơ tại đây
}

const Profile: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const { handleLike, handleUnlike, isLiked } = useServiceLike();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const profile = useAppSelector(state => state.authReducer.profile) as Profile | null;
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
            setLoading(false);
            fetchAssociatedServices(profile.id);
        }
    }, [profile, isAuthenticated, dispatch]);

    const fetchAssociatedServices = async (userId: string) => {
        try {
            const response = await axiosInstance.get<Service[]>(`/users/${userId}/services`);
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
                    <Col xs={24} md={24} xl={24}>
                        {/* Đảm bảo tab chiếm toàn bộ chiều rộng */}
                        <Tabs tabPosition='left' defaultActiveKey='1'>
                            <Tabs.TabPane tab='Profile Details' key='1'>
                                <ProfileDetails
                                    profileData={profile} // Sử dụng profile từ Redux trực tiếp
                                    loading={loading}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Liked Services' key='2'>
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
                            </Tabs.TabPane>
                            <Tabs.TabPane tab='Associated Services' key='3'>
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
                                                <Button
                                                    type='primary'
                                                    icon={<PlusOutlined />}
                                                    onClick={handleCreateService}>
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
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Profile;
