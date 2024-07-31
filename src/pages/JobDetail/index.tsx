import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/api';
import { Card, Avatar, Rate, Divider, Row, Col, Typography, Badge, Button, Tabs, Collapse } from 'antd';
import {
    UserOutlined,
    TrophyOutlined,
    CheckOutlined,
    SyncOutlined,
    ClockCircleOutlined,
    CaretRightOutlined,
} from '@ant-design/icons';
import { Service } from '../../models/Service';
import LoginModal from '../../components/LoginModal';

const { Title, Text } = Typography;

const renderListItems = (items: string[]) => {
    return items.map((item, index) => {
        let icon = <CheckOutlined style={{ marginRight: '8px' }} />;

        if (item.toLowerCase().includes('revisions')) {
            icon = <SyncOutlined style={{ marginRight: '8px' }} />;
        } else if (item.toLowerCase().includes('day delivery')) {
            icon = <ClockCircleOutlined style={{ marginRight: '8px' }} />;
        }

        return (
            <li key={index}>
                {icon}
                {item}
            </li>
        );
    });
};

const renderReviews = (reviews: Service['reviews']) => {
    return reviews.map((review, index) => (
        <div key={index}>
            <Row gutter={16} align='middle'>
                <Col>
                    <Avatar size={48} src={review.user?.profilePicture || <UserOutlined />} />
                </Col>
                <Col>
                    <Title level={5}>{review.user.username}</Title>
                    <Text>{new Date(review.createdAt).toLocaleDateString()}</Text>
                    <Rate disabled defaultValue={review.rating} style={{ marginLeft: '10px' }} />
                </Col>
            </Row>
            <Text>{review.reviewText}</Text>
            <Divider />
        </div>
    ));
};

const renderFaq = (faq: Service['faq']) => {
    const faqItems = faq.map((item, index) => ({
        key: index.toString(),
        label: item.question,
        children: <Text>{item.answer}</Text>,
    }));

    return (
        <Collapse
            ghost
            accordion
            bordered={false}
            expandIconPosition='start'
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className='job-detail__collapse'
            items={faqItems}
        />
    );
};

const renderGallery = (gallery: Service['gallery']) => {
    return (
        <Row gutter={16}>
            {gallery.map((image, index) => (
                <Col key={index} span={6}>
                    <img alt={`gallery-${index}`} src={image} style={{ width: '100%' }} />
                </Col>
            ))}
        </Row>
    );
};

const JobDetail: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [loginModalVisible, setLoginModalVisible] = useState(false);

    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        axiosInstance
            .get<Service>(`/services/${serviceId}`)
            .then(response => {
                setService(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error fetching the service data!', error);
                setLoading(false);
            });
    }, [serviceId]);

    const handleContactClick = () => {
        if (isLoggedIn) {
            navigate(`/chat/${service?.userId}`);
        } else {
            setLoginModalVisible(true);
        }
    };

    const handleLoginSuccess = () => {
        setLoginModalVisible(false);
        navigate(`/chat/${service?.userId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!service) {
        return <div>No service data found.</div>;
    }

    const items =
        service.pricingPlans?.map((plan, index) => ({
            key: (index + 1).toString(),
            label: plan.title,
            children: (
                <>
                    <div className='pricing__title'>
                        <Title level={4}>{plan.title}</Title>
                        <Text className='pricing__price'>${plan.price}</Text>
                    </div>
                    <Text>
                        <ul>{renderListItems(plan.benefits)}</ul>
                    </Text>
                    <Button type='primary' block className='pricing__button'>
                        Continue
                    </Button>
                    <Button block className='pricing__button' onClick={handleContactClick}>
                        Contact
                    </Button>
                </>
            ),
        })) || [];

    return (
        <div className='job-detail job-detail--max-width'>
            <div className='job-detail__left-content'>
                <Card>
                    {/* Header Section */}
                    <Row gutter={16} align='middle'>
                        <Col>
                            <Title level={2}>{service.title}</Title>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Seller Information Section */}
                    <Row gutter={16} align='middle'>
                        <Col>
                            <Avatar size={64} src={service.profilePicture} icon={<UserOutlined />} />
                        </Col>
                        <Col>
                            <Title level={4}>{service.username}</Title>
                            <Text strong>
                                {service.averageRating || 0} ({service.reviewsCount || 0})
                            </Text>
                            <Rate disabled defaultValue={service.averageRating || 0} style={{ marginLeft: '10px' }} />
                            {/* <Text>{service.userOrdersInQueue || 0} orders in queue</Text> */}
                        </Col>
                        <Col>
                            <Badge count={<TrophyOutlined />} style={{ backgroundColor: '#52c41a' }} />
                            <Text strong>People keep coming back!</Text>
                            <Text>This seller has many repeat buyers.</Text>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Gig Description Section */}
                    <Title level={3}>About this gig</Title>
                    <Text>
                        {service.aboutThisGig?.map((paragraph, index) => <p key={index}>{paragraph}</p>) || (
                            <p>No description available.</p>
                        )}
                    </Text>

                    <Divider />

                    {/* FAQ Section */}
                    <Title level={3}>FAQ</Title>
                    {renderFaq(service.faq || [])}

                    <Divider />

                    {/* Gallery Section */}
                    <Title level={3}>Gallery</Title>
                    {renderGallery(service.gallery || [])}

                    <Divider />

                    {/* Reviews Section */}
                    <Title level={3}>Reviews</Title>
                    {renderReviews(service.reviews || [])}
                </Card>
            </div>

            <div className='job-detail__right-content'>
                <Card title='Pricing' bordered={false} className='job-detail__sticky-card'>
                    <Tabs defaultActiveKey='1' items={items} />
                </Card>
            </div>

            <LoginModal
                visible={loginModalVisible}
                onCancel={() => setLoginModalVisible(false)}
                onLoginSuccess={handleLoginSuccess}
            />
        </div>
    );
};

export default JobDetail;
