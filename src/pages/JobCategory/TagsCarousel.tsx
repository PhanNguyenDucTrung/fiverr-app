import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { popularTags } from './data';

const CustomNextArrow: React.FC<any> = ({ onClick }) => (
    <div className='carousel__arrow carousel__arrow--next' onClick={onClick}>
        <i className='fas fa-chevron-right'></i>
    </div>
);

const CustomPrevArrow: React.FC<any> = ({ onClick }) => (
    <div className='carousel__arrow carousel__arrow--prev' onClick={onClick}>
        <i className='fas fa-chevron-left'></i>
    </div>
);

const TagsCarousel: React.FC = () => {
    const [slidesToScroll, setSlidesToScroll] = useState(1);
    const totalSlides = popularTags.length;
    const initialSlidesToShow = 5;
    const initialSlidesToScroll = totalSlides < initialSlidesToShow ? 1 : initialSlidesToShow;

    const handleBeforeChange = (_currentSlide, nextSlide) => {
        const remainingSlides = totalSlides - nextSlide;
        setSlidesToScroll(remainingSlides < initialSlidesToShow ? remainingSlides : initialSlidesToShow);
    };

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
                breakpoint: 1324,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: false,
                },
            },
        ],
    };

    useEffect(() => {
        setSlidesToScroll(initialSlidesToScroll);
    }, [totalSlides, initialSlidesToScroll]);

    return (
        <Slider {...sliderSettings}>
            {popularTags.map(tag => (
                <div key={tag.id} className='carousel__item'>
                    <div className='carousel__tag'>
                        <img src={tag.imageUrl} alt={tag.name} className='carousel__image' />
                        <span className='carousel__name'>{tag.name}</span>
                        <i className='fas fa-arrow-right carousel__icon'></i>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default TagsCarousel;
