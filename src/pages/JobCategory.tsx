import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Spin } from 'antd';
import { fetchSubcategories } from '../redux/reducers/congViecSlice';
import Modal from 'react-modal';

type Category = {
    id: string;
    name: string;
};

type Subcategory = {
    name: string;
    childCategories: { name: string; id: string }[];
};

type CategoryDetails = {
    name: string;
    subcategories: Subcategory[];
};

const tags = [
    'Programming & Tech',
    'Fivem Script',
    'Convert Website to App',
    'Custom App',
    'Discord Server',
    'Python Developer',
    'PHP Programmer',
    'Unity Developer',
    'Discord Chatbot',
    'Twitch Trivia Bot',
    'Shopify Expert',
    'Wix website builder',
    'Squarespace Programmer',
    'Roblox Scripter',
    'Bloxburg Builder',
    'Minecraft Builders',
    'Wordpress Customization',
    'Book Formatting',
    'Custom Landing Page',
    'Web Scraping',
    'NFT Promotion',
];

const popularTags = [
    {
        id: '1',
        name: 'SEO',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '2',
        name: 'Logo Design',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '3',
        name: 'Social Media Management',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '4',
        name: 'Email Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '5',
        name: 'PPC Advertising',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '6',
        name: 'Affiliate Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '6',
        name: 'Affiliate Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '6',
        name: 'Affiliate Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '6',
        name: 'Affiliate Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '6',
        name: 'Affiliate Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
    {
        id: '6',
        name: 'Affiliate Marketing',
        imageUrl:
            'https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png',
    },
];

const CustomNextArrow: React.FC<any> = ({ onClick }) => (
    <div className='slick-arrow slick-next' onClick={onClick}>
        <i className='fas fa-arrow-right'></i>
    </div>
);

const CustomPrevArrow: React.FC<any> = ({ onClick }) => (
    <div className='slick-arrow slick-prev' onClick={onClick}>
        <i className='fas fa-arrow-left'></i>
    </div>
);

const JobCategory: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryName } = useParams<{ categoryName: string }>();
    const [slidesToScroll, setSlidesToScroll] = useState(1);
    const categoriesMenu = useAppSelector(state => state.congViecReducer.categoriesMenu) as Category[];
    const categoryDetails = useAppSelector(state => state.congViecReducer.categoryDetails) as CategoryDetails | null;
    console.log('categoryDetails', categoryDetails);
    const totalSlides = popularTags.length;
    const initialSlidesToShow = 5;
    const initialSlidesToScroll = totalSlides < initialSlidesToShow ? 1 : initialSlidesToShow;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setSlidesToScroll(initialSlidesToScroll);
    }, [totalSlides, initialSlidesToScroll]);

    useEffect(() => {
        if (categoryName) {
            const category = categoriesMenu.find(
                (c: Category) => c.name.toLowerCase().replace(/\s/g, '-') === categoryName
            );
            if (category) {
                dispatch(fetchSubcategories(category.id));
            }
        }
    }, [categoryName, categoriesMenu, dispatch]);

    const handleBeforeChange = (_currentSlide, nextSlide) => {
        // console.log('currentSlide', currentSlide);
        const remainingSlides = totalSlides - nextSlide;
        setSlidesToScroll(remainingSlides < initialSlidesToShow ? remainingSlides : initialSlidesToShow);
    };

    if (!categoryDetails) {
        return <Spin />;
    }

    const { name, subcategories } = categoryDetails;

    const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow: initialSlidesToShow,
        slidesToScroll,
        variableWidth: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        beforeChange: handleBeforeChange,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div>
            <div className='banner-section'>
                <div className='max-width-container'>
                    <div className='hero-banner-wrapper'>
                        <div className='banner-content'>
                            <h1 className='title'>{name}</h1>
                            <p>Designs to make you stand out.</p>
                            <button onClick={() => setModalIsOpen(true)}>
                                <i className='fas fa-play'></i> How Fiverr Works
                            </button>
                        </div>
                    </div>
                    <Modal
                        appElement={document.getElementById('root') as HTMLElement}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            content: {
                                top: '50%',
                                left: '50%',
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                                transform: 'translate(-50%, -50%)',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0',
                                margin: '0',
                                width: '100%',
                                maxWidth: '900px',
                                height: '455px',
                                maxHeight: '90vh',
                                overflow: 'hidden',
                                zIndex: 9999,
                            },
                            overlay: {
                                zIndex: 9999,
                                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                            },
                        }}>
                        <video
                            width='100%'
                            style={{
                                margin: '0',
                                padding: '0',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            autoPlay
                            controls>
                            <source
                                src='https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7'
                                type='video/mp4'></source>
                        </video>
                        {/* <button onClick={() => setModalIsOpen(false)}>Close</button> */}
                    </Modal>
                </div>
            </div>

            <div className='popular-tags-section max-width-container'>
                <h2>Most Popular in {name}</h2>
                <Slider {...sliderSettings}>
                    {popularTags.map(tag => (
                        <div key={tag.id} className='tag-item-wrapper'>
                            <div className='tag-item'>
                                <img src={tag.imageUrl} alt={tag.name} className='tag-image' />
                                <span className='tag-name'>{tag.name}</span>
                                <i className='fas fa-arrow-right tag-arrow'></i>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <div className='categories-section'>
                <div className='max-width-container'>
                    <h5>Explore {name}</h5>
                    <div className='categories-menu'>
                        {subcategories?.map((subcategory: Subcategory) => (
                            <div key={subcategory.name} className='category-item'>
                                <div className='image-placeholder'>{/* Image or Placeholder */}</div>
                                <h3>{subcategory.name}</h3>
                                <ul>
                                    {subcategory.childCategories.map(childCategory => (
                                        <li key={childCategory.id}>
                                            <a
                                                href='#'
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <span>{childCategory.name}</span>

                                                {/* arrow icon */}
                                                <i className='fas fa-arrow-right'></i>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='related-tags max-width-container'>
                <h2>You might be interested in</h2>
                <div className='tags-container'>
                    {tags.map((tag, index) => (
                        <button key={index} className='tag-button'>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobCategory;
