import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchSubcategories } from '../redux/reducers/congViecSlice';

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
    { id: '1', name: 'SEO', imageUrl: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Content Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Social Media Management', imageUrl: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Email Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '5', name: 'PPC Advertising', imageUrl: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Affiliate Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Affiliate Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Affiliate Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Affiliate Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Affiliate Marketing', imageUrl: 'https://via.placeholder.com/50' },
    { id: '6', name: 'Affiliate Marketing', imageUrl: 'https://via.placeholder.com/50' },
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

    const totalSlides = popularTags.length;
    const initialSlidesToShow = 5;
    const initialSlidesToScroll = totalSlides < initialSlidesToShow ? 1 : initialSlidesToShow;

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
        return <div>Loading...</div>;
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
                            <button>
                                <i className='fas fa-play'></i> How Fiverr Works
                            </button>
                        </div>
                    </div>
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
