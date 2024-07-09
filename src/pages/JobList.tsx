import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Filter from '../components/Filter';
import axiosInstance from '../utils/api';
import { Skeleton } from 'antd';

interface Service {
    id: string;
    userId: string;
    username: string;
    title: string;
    description: string;
    price: number;
    rating: number;
}

const JobList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServicesByCategory = async categoryId => {
            try {
                const response = await axiosInstance.get(`/services/childcategory/${categoryId}`);
                console.log('Services:', response.data);
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        const pathSegments = location.pathname.split('/');
        const childCategoryId = pathSegments[pathSegments.length - 1];

        fetchServicesByCategory(childCategoryId);
    }, [location.pathname]);

    return (
        <div>
            <div className='job-list-wrapper'>
                <div className='max-width-container'>
                    <h1>Job List</h1>

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
                                              <img
                                                  src={`https://via.placeholder.com/150?text=${service.title}`}
                                                  alt={service.title}
                                              />
                                          </div>
                                          <div className='job-item__body'>
                                              <div className='seller-info'>
                                                  <img src={`https://via.placeholder.com/50`} alt={service.username} />
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
                                              </div>
                                          </div>
                                      </div>
                                  ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobList;
