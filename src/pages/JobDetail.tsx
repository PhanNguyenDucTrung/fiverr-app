import { Card, Avatar, Rate, Divider, Row, Col, Typography, Badge, Button, Tabs } from 'antd';
import { UserOutlined, TrophyOutlined, CheckOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;

const basicItems = ['10-day delivery', '2 Revisions', 'Up to 1,500 words', 'Outline', 'Topic research'];

const standardItems = [
    '20-day delivery',
    '5 Revisions',
    'Up to 5,000 words',
    'Outline',
    'Topic research',
    'Illustrations',
];

const premiumItems = [
    '30-day delivery',
    'Unlimited Revisions',
    'Up to 10,000 words',
    'Outline',
    'Topic research',
    'Illustrations',
    'Marketing material',
];

const reviews = [
    {
        name: 'datonekidvids',
        location: 'US, United States',
        rating: 5,
        date: '2 months ago',
        review: 'Exceptional writer and teacher. He explained things to me I had never thought of, and showed me how pieces can be put together in a way I never thought possible. I also thought he was a kind lad.',
    },
    {
        name: 'chevivre',
        location: 'CA, Canada',
        rating: 4.3,
        date: '2 months ago',
        review: "Amazing alpha read of my current draft. Highly informative. I would definitely consider rehiring once I'm further in/finished my first draft. Attention to detail was very high as was the quality of work done. My only concern was price, it was...",
    },
    {
        name: 'songboy1965',
        location: 'US, United States',
        rating: 5,
        date: '2 months ago',
        review: 'It was a pleasure working with Michael Jaymes and I hope this is just the beginning of a long-term business relationship. He is professional and highly competent at his craft. He kept me updated on his progress and the finished project exceeded expectations. I highly recommend his services!',
    },
    {
        name: 'latifa_33',
        location: 'AE, United Arab Emirates',
        rating: 5,
        date: '1 month ago',
        review: 'I worked with Michael on a small part of my project, and his feedback was extremely helpful. He provided clear and insightful suggestions that significantly improved my plotline. I definitely plan to work with him in the future. His response...',
    },
    {
        name: 'yasports91',
        location: 'US, United States',
        rating: 5,
        date: '1 month ago',
        review: 'I enjoyed working with Michael again on a new project in a genre in which he specializes. He has immense knowledge and shares tremendous feedback, elevating this story.',
    },
];

const renderListItems = items => {
    return items.map((item, index) => (
        <li key={index}>
            <CheckOutlined style={{ marginRight: '8px' }} />
            {item}
        </li>
    ));
};

const renderReviews = () => {
    return reviews.map((review, index) => (
        <div key={index}>
            <Row gutter={16} align='middle'>
                <Col>
                    <Avatar size={48} icon={<UserOutlined />} />
                </Col>
                <Col>
                    <Title level={5}>{review.name}</Title>
                    <Text>{review.location}</Text>
                    <Rate disabled defaultValue={review.rating} style={{ marginLeft: '10px' }} />
                    <Text>{review.date}</Text>
                </Col>
            </Row>
            <Text>{review.review}</Text>
            <Divider />
        </div>
    ));
};

const JobDetail = () => {
    const onChange = (_key: string) => {};

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Basic',
            children: (
                <>
                    <div className='pricing-title'>
                        <Title level={4}>Book Outline Only</Title>
                        <Text className='pricing-price'>$250</Text>
                    </div>
                    <Text>
                        <ul>{renderListItems(basicItems)}</ul>
                    </Text>
                    <Button type='primary' block className='pricing-button'>
                        Continue
                    </Button>
                    <Button block className='pricing-button'>
                        Contact
                    </Button>
                </>
            ),
        },
        {
            key: '2',
            label: 'Standard',
            children: (
                <>
                    <div className='pricing-title'>
                        <Title level={4}>Full Book</Title>
                        <Text className='pricing-price'>$500</Text>
                    </div>
                    <Text>
                        <ul>{renderListItems(standardItems)}</ul>
                    </Text>
                    <Button type='primary' block className='pricing-button'>
                        Continue
                    </Button>
                    <Button block className='pricing-button'>
                        Contact
                    </Button>
                </>
            ),
        },
        {
            key: '3',
            label: 'Premium',
            children: (
                <>
                    <div className='pricing-title'>
                        <Title level={4}>Premium Package</Title>
                        <Text className='pricing-price'>$1000</Text>
                    </div>
                    <Text>
                        <ul>{renderListItems(premiumItems)}</ul>
                    </Text>
                    <Button type='primary' block className='pricing-button'>
                        Continue
                    </Button>
                    <Button block className='pricing-button'>
                        Contact
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }} className='job-detail max-width-container'>
            <div className='left-content'>
                <Card>
                    {/* Header Section */}
                    <Row gutter={16} align='middle'>
                        <Col>
                            <Title level={2}>
                                I will write children childrens chapter book ebook kids fiction ghostwriter writer
                            </Title>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Seller Information Section */}
                    <Row gutter={16} align='middle'>
                        <Col>
                            <Avatar size={64} icon={<UserOutlined />} />
                        </Col>
                        <Col>
                            <Title level={4}>Alex PJ</Title>
                            <Text strong>5.0 (11)</Text>
                            <Rate disabled defaultValue={5} style={{ marginLeft: '10px' }} />
                            <Text>1 order in queue</Text>
                        </Col>
                        <Col>
                            <Badge count={<TrophyOutlined />} style={{ backgroundColor: '#52c41a' }} />
                            <Text strong>People keep coming back!</Text>
                            <Text>This seller has many repeat buyers.</Text>
                        </Col>
                    </Row>

                    <Divider />

                    {/* Client Logos Section */}
                    <Row gutter={16}>
                        <Col span={4}>
                            <img alt='BBC One' src='https://via.placeholder.com/100x50' />
                        </Col>
                        <Col span={4}>
                            <img alt='Minecraft' src='https://via.placeholder.com/100x50' />
                        </Col>
                        <Col span={4}>
                            <img alt='Scholastic UK' src='https://via.placeholder.com/100x50' />
                        </Col>
                    </Row>

                    <Divider />

                    {/* Gig Description Section */}
                    <Title level={3}>About this gig</Title>
                    <Text>
                        FOR ORDERS OVER 10,000 WORDS, PLEASE GET IN TOUCH FOR A CUSTOM QUOTE.
                        <br />
                        <br />
                        My name is Alexander Peart & I am a published author, screenwriter, and playwright. One of my
                        ghostwritten works was published and later turned into a large-scale children's movie!
                        <br />
                        <br />
                        Welcome to The Stardust Experience!
                        <br />
                        <br />
                        We are a small team of writers working out of a studio near Birmingham in the UK. We are, quite
                        simply, the best all-in-one children's ghostwriting service there is...(we would say that, of
                        course - but go check the reviews on our Fiverr page - or our website: thestardustexperience.com
                        - if you don't believe us!)
                        <br />
                        <br />
                        Whether you want a funny and heartwarming David Walliams style book, or a fantastical fantasy
                        like Harry Potter, we can craft you a potential bestseller!
                    </Text>

                    <Divider />

                    {/* Process Section */}
                    <Title level={3}>Our process:</Title>
                    <Text>
                        <ol>
                            <li>Consultation - We find out what it is that you want.</li>
                            <li>Outline - We create a book outline based on your idea.</li>
                            <li>
                                Writing - Upon approval of the outline, we write your book for you, delivering in four
                                milestones.
                            </li>
                        </ol>
                        And that's it! You have your very own professionally written children's chapter book!
                    </Text>

                    <Divider />

                    {/* Additional Information Section */}
                    <Title level={3}>Additional Information</Title>
                    <Text>
                        Genre: Children's books, Comic book, Humor/Entertainment, Young adult
                        <br />
                        Language: English
                        <br />
                        Book type: Fiction
                        <br />
                        Delivery style preference: Please inform the freelancer of any preferences or concerns regarding
                        the use of AI tools in the completion and/or delivery of your order.
                    </Text>

                    <Divider />

                    {/* Reviews Section */}
                    <Title level={3}>Reviews</Title>
                    {renderReviews()}
                </Card>
            </div>

            <div className='right-content'>
                <Card title='Pricing' bordered={false} className='sticky-card'>
                    <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
                </Card>
            </div>
        </div>
    );
};

export default JobDetail;
