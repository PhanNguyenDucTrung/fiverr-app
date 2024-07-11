import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Filter from '../components/Filter';
import axiosInstance from '../utils/api';
import { Skeleton, Tooltip, Modal } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchUserProfile } from '../redux/reducers/authSlice';
import Login from './Login';

interface Service {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    likes: number;
}

const JobList: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [likedServices, setLikedServices] = useState<string[]>([]);
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search');
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const token = useAppSelector(state => state.authReducer.token);
    const profile = useAppSelector(state => state.authReducer.profile);

    const fetchServicesByCategory = async (categoryId: string) => {
        try {
            const response = await axiosInstance.get<Service[]>(`/services/childcategory/${categoryId}`);
            console.log('Services:', response.data);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!profile && token) {
            dispatch(fetchUserProfile());
        } else {
            setLikedServices(profile?.likedServices || []);
        }

        const pathSegments = location.pathname.split('/');
        const childCategoryId = pathSegments[pathSegments.length - 1];

        fetchServicesByCategory(childCategoryId);
    }, [location.pathname, profile, token]);

    const handleLike = async (serviceId: string) => {
        if (!token) {
            setIsLoginModalVisible(true);
            return;
        }

        try {
            await axiosInstance.post(`/services/${serviceId}/like`);
            setLikedServices(prevLikedServices => [...prevLikedServices, serviceId]);
            setServices(prevServices =>
                prevServices.map(service =>
                    service.id === serviceId ? { ...service, likes: service.likes + 1 } : service
                )
            );
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
            await axiosInstance.post(`/services/${serviceId}/unlike`);
            setLikedServices(prevLikedServices => prevLikedServices.filter(id => id !== serviceId));
            setServices(prevServices =>
                prevServices.map(service =>
                    service.id === serviceId ? { ...service, likes: service.likes - 1 } : service
                )
            );
        } catch (error) {
            console.error('Error unliking service:', error);
        }
    };

    const isLiked = (serviceId: string) => {
        return likedServices.includes(serviceId);
    };

    return (
        <div>
            <div className='job-list-wrapper'>
                <div className='max-width-container'>
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
                            {loading
                                ? Array.from({ length: 10 }).map((_, index) => (
                                      <div key={index} className='job-item'>
                                          <div className='job-item__image'>
                                              <Skeleton.Image active />
                                          </div>
                                          <div className='job-item__body'>
                                              <div className='seller-info'>
                                                  <div
                                                      style={{
                                                          display: 'flex',
                                                          alignItems: 'center',
                                                      }}>
                                                      <Skeleton.Avatar
                                                          active
                                                          size={50}
                                                          shape='circle'
                                                          style={{
                                                              marginTop: 10,
                                                          }}
                                                      />
                                                      <Skeleton.Input
                                                          active
                                                          style={{
                                                              marginTop: 10,
                                                          }}
                                                      />
                                                  </div>
                                              </div>
                                              <div className='job-item__content'>
                                                  <Skeleton.Input active style={{ width: '100%', marginTop: 10 }} />

                                                  <Skeleton.Input active style={{ width: '100%', marginTop: 10 }} />
                                              </div>
                                          </div>
                                      </div>
                                  ))
                                : services.map((service: Service) => (
                                      <div key={service.id} className='job-item'>
                                          <div className='job-item__image'>
                                              <LazyLoad height={150} once>
                                                  <img
                                                      src={`https://via.placeholder.com/150?text=${service.title}`}
                                                      alt={service.title}
                                                  />
                                              </LazyLoad>
                                          </div>
                                          <div className='job-item__body'>
                                              <div className='seller-info'>
                                                  <LazyLoad height={50} once>
                                                      <img
                                                          src={`https://via.placeholder.com/50`}
                                                          alt={service.username}
                                                      />
                                                  </LazyLoad>
                                                  <p>{service.username}</p>
                                              </div>
                                              <div className='job-item__content'>
                                                  <h3>{service.title}</h3>
                                                  <p>{service.description}</p>
                                                  <p>
                                                      ⭐ {service.rating || 0}
                                                      {/* <span>({service.userId})</span> */}
                                                  </p>
                                                  <p>
                                                      Starting at US<strong>${service.price}</strong>
                                                  </p>
                                                  <Tooltip title='Add to favorites'>
                                                      {isLiked(service.id) ? (
                                                          <HeartFilled
                                                              onClick={() => handleUnlike(service.id)}
                                                              style={{
                                                                  position: 'absolute',
                                                                  top: '10px',
                                                                  right: '10px',
                                                                  fontSize: '24px',
                                                                  color: '#eb2f96',
                                                              }}
                                                          />
                                                      ) : (
                                                          <HeartOutlined
                                                              onClick={() => handleLike(service.id)}
                                                              style={{
                                                                  position: 'absolute',
                                                                  top: '10px',
                                                                  right: '10px',
                                                                  fontSize: '24px',
                                                                  color: '#eb2f96',
                                                              }}
                                                          />
                                                      )}
                                                  </Tooltip>
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title='Login Required'
                open={isLoginModalVisible}
                onCancel={() => setIsLoginModalVisible(false)}
                zIndex={10000}
                footer={null}>
                <Login />
            </Modal>
        </div>
    );
};

export default JobList;
