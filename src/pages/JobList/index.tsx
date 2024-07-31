import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Modal } from 'antd';

import axiosInstance from '../../utils/api';
import { useServiceLike } from '../../hooks/useServiceLike';

import Filter from '../../components/Filter';
import ServiceItem from '../../components/ServiceItem';
import SignUpForm from '../SignUpForm';
import LoadingSkeleton from './LoadingSkeleton';

import { Service } from '../../models/Service';

const JobList: React.FC = () => {
    const location = useLocation();
    const { handleLike, handleUnlike, isLiked, isLoginModalVisible, setIsLoginModalVisible } = useServiceLike();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const { tenChiTiet } = useParams<{ tenChiTiet: string }>();

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
        const pathSegments = location.pathname.split('/');
        const childCategoryId = pathSegments[pathSegments.length - 1];

        if (searchTerm) {
            fetchServicesBySearch(searchTerm);
        } else if (childCategoryId) {
            fetchServicesByCategory(childCategoryId);
        }
    }, [location.pathname, location.search, fetchServicesBySearch, fetchServicesByCategory, searchTerm]);

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
