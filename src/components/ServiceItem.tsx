import React, { useState } from 'react';
import { Skeleton, Tooltip } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import { Service } from '../pages/JobList';
import { useNavigate } from 'react-router-dom';

interface ServiceItemProps {
    service: Service;
    isLiked: (serviceId: string) => boolean;
    handleLike: (serviceId: string) => void;
    handleUnlike: (serviceId: string) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, isLiked, handleLike, handleUnlike }) => {
    const navigate = useNavigate();
    const [imageLoading, setImageLoading] = useState(true);

    const handleItemClick = () => {
        navigate(`/job-detail/`);
    };

    const handleFavoriteClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation(); // Ngăn chặn sự kiện điều hướng khi nhấp vào nút "Add to favorites"
        if (isLiked(service.id)) {
            handleUnlike(service.id);
        } else {
            handleLike(service.id);
        }
    };

    return (
        <div className='job-item' onClick={handleItemClick}>
            <div className='job-item__image'>
                {imageLoading && <Skeleton.Image active />}
                <LazyLoad height={150} once>
                    <img
                        src={`https://via.placeholder.com/150?text=${service.title}`}
                        alt={service.title}
                        onLoad={() => setImageLoading(false)}
                        style={{ display: imageLoading ? 'none' : 'block' }}
                    />
                </LazyLoad>
            </div>
            <div className='job-item__body'>
                <div className='seller-info'>
                    <LazyLoad height={50} once>
                        <img src={`https://via.placeholder.com/50`} alt={service.username} />
                    </LazyLoad>
                    <p>{service.username}</p>
                </div>
                <div className='job-item__content'>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <p>
                        ⭐ {service.averageRating || 0} <span>({service.reviewsCount})</span>
                    </p>
                    <p>
                        Starting at US<strong>${service.price}</strong>
                    </p>
                    <Tooltip title='Add to favorites'>
                        {isLiked(service.id) ? (
                            <HeartFilled
                                onClick={handleFavoriteClick}
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
                                onClick={handleFavoriteClick}
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
    );
};

export default ServiceItem;
