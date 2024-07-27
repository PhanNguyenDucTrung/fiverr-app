import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Skeleton, Modal, App as AntdApp } from 'antd';

import axiosInstance from '../../utils/api';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchUserProfile } from '../../redux/reducers/authSlice';

import Filter from '../../components/Filter';
import ServiceItem from '../../components/ServiceItem';
import SignUpForm from '../SignUpForm';
import LoadingSkeleton from './LoadingSkeleton';

import { Service } from '../../models/Service';

const JobList: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [likedServices, setLikedServices] = useState<Service[]>([]);
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const { tenChiTiet } = useParams<{ tenChiTiet: string }>();
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const token = useAppSelector(state => state.authReducer.token);
    const profile = useAppSelector(state => state.authReducer.profile);
    const { message } = AntdApp.useApp();

    const fetchServicesBySearch = useCallback(async (searchTerm: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<Service[]>(
                `/services/search?query=${encodeURIComponent(searchTerm)}`
            );
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchServicesByCategory = useCallback(async (categoryId: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get<Service[]>(`/services/childcategory/${categoryId}`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token && !profile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch, profile, token]);

    useEffect(() => {
        if (profile) {
            setLikedServices(profile.likedServices || []);
        }
    }, [profile]);

    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        const childCategoryId = pathSegments[pathSegments.length - 1];

        if (searchTerm) {
            fetchServicesBySearch(searchTerm);
        } else if (childCategoryId) {
            fetchServicesByCategory(childCategoryId);
        }
    }, [location.pathname, location.search, fetchServicesBySearch, fetchServicesByCategory, searchTerm]);

    const handleLike = async (serviceId: string) => {
        if (!token) {
            setIsLoginModalVisible(true);
            return;
        }
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/like`);
            if (response.status === 200) message.success('Service liked successfully');
            const likedService = services.find(service => service.id === serviceId);
            if (likedService) {
                setLikedServices(prevLikedServices => [...prevLikedServices, likedService]);
                setServices(prevServices =>
                    prevServices.map(service =>
                        service.id === serviceId ? { ...service, likes: service.likes + 1 } : service
                    )
                );
            }
        } catch (error) {
            console.error('Error liking service:', error);
        }
    };

    const handleUnlike = async (serviceId: string) => {
        if (!token) {
            setIsLoginModalVisible(true);
            return;
        }
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/unlike`);
            if (response.status === 200) message.success('Service unliked successfully');
            setLikedServices(prevLikedServices => prevLikedServices.filter(service => service.id !== serviceId));
            setServices(prevServices =>
                prevServices.map(service =>
                    service.id === serviceId ? { ...service, likes: service.likes - 1 } : service
                )
            );
        } catch (error) {
            console.error('Error unliking service:', error);
        }
    };

    const isLiked = (serviceId: string) => likedServices.some(service => service.id === serviceId);

    return (
        <div>
            <div className='job-list-wrapper'>
                <div className='max-width-container'>
                    <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>
                        {tenChiTiet &&
                            tenChiTiet
                                .split('-')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')}
                    </h2>
                    {searchTerm && (
                        <div>
                            <h2>
                                Results for <strong>"{searchTerm}"</strong>
                            </h2>
                        </div>
                    )}

                    {services && <p>{services.length} services available</p>}

                    <Filter />

                    <div className='job-list'>
                        <div className='listing-container grid-view'>
                            {loading ? (
                                <LoadingSkeleton />
                            ) : (
                                services.map(service => (
                                    <ServiceItem
                                        key={service.id}
                                        service={service}
                                        isLiked={isLiked}
                                        handleLike={handleLike}
                                        handleUnlike={handleUnlike}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                width={900}
                style={{ padding: '0' }}
                closable={false}
                open={isLoginModalVisible}
                onCancel={() => setIsLoginModalVisible(false)}
                zIndex={10000}
                footer={null}>
                <SignUpForm />
            </Modal>
        </div>
    );
};

export default JobList;
