import { useState, useEffect } from 'react';
import { App as AntdApp } from 'antd';
import axiosInstance from '../utils/api';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchUserProfile } from '../redux/reducers/authSlice';
import { Service } from '../models/Service';

export const useServiceLike = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.authReducer.token);
    const profile = useAppSelector(state => state.authReducer.profile);
    const [likedServices, setLikedServices] = useState<Service[]>([]);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const { message } = AntdApp.useApp();

    useEffect(() => {
        if (profile) {
            setLikedServices(profile.likedServices || []);
        }
    }, [profile]);

    const handleLike = async (serviceId: string) => {
        if (!token) {
            setIsLoginModalVisible(true);
            return;
        }
        try {
            const response = await axiosInstance.post(`/services/${serviceId}/like`);
            if (response.status === 200) {
                message.success('Service liked successfully');
                const likedService = profile?.likedServices.find(service => service.id === serviceId);
                if (likedService) {
                    setLikedServices(prevLikedServices => [...prevLikedServices, likedService]);
                }
                await dispatch(fetchUserProfile());
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
            if (response.status === 200) {
                message.success('Service unliked successfully');
                setLikedServices(prevLikedServices => prevLikedServices.filter(service => service.id !== serviceId));
                await dispatch(fetchUserProfile());
            }
        } catch (error) {
            console.error('Error unliking service:', error);
        }
    };

    const isLiked = (serviceId: string) => {
        return likedServices.some(service => service.id === serviceId);
    };

    return {
        likedServices,
        handleLike,
        handleUnlike,
        isLiked,
        isLoginModalVisible,
        setIsLoginModalVisible,
    };
};
