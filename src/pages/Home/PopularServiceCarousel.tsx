import React from 'react';
import Slider from 'react-slick';

const CustomNextArrow = ({
    className,
    style,
    onClick,
}: {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
}) => {
    return (
        <button className={`${className} carousel__arrow carousel__arrow--next`} style={{ ...style }} onClick={onClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#333' width='24px' height='24px'>
                <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' />
            </svg>
        </button>
    );
};

const CustomPrevArrow = ({
    className,
    style,
    onClick,
}: {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
}) => {
    return (
        <button className={`${className} carousel__arrow carousel__arrow--prev`} style={{ ...style }} onClick={onClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#333' width='24px' height='24px'>
                <path d='M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z' />
            </svg>
        </button>
    );
};

const PopularServiceCarousel: React.FC = () => {
    const settings = {
        speed: 400,
        arrows: true,
        // arrows: false,
        initialSlide: 0,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <CustomNextArrow className={''} style={{}} onClick={() => {}} />,
        prevArrow: <CustomPrevArrow className={''} style={{}} onClick={() => {}} />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 700, // Adjust breakpoint as needed
                settings: {
                    arrows: false, // Hide arrows on smaller screens
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className='carousel__content'>
            <h2 className='carousel__title'>Popular Services</h2>
            <Slider {...settings}>
                <div className='carousel__item'>
                    <a href='#' className='carousel__link'>
                        <h4 className='carousel__subtitle'>
                            <small>Add talent to AI</small>AI Artists
                        </h4>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png'
                            alt='Ai Artists'
                            className='carousel__image'
                        />
                    </a>
                </div>
                <div className='carousel__item'>
                    <a href='#' className='carousel__link'>
                        <h4 className='carousel__subtitle'>
                            <small>Build your brand</small>Logo Design
                        </h4>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png'
                            alt=''
                            className='carousel__image'
                        />
                    </a>
                </div>
                <div className='carousel__item'>
                    <a href='#' className='carousel__link'>
                        <h4 className='carousel__subtitle'>
                            <small>Customize your site</small>WordPress
                        </h4>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png'
                            alt=''
                            className='carousel__image'
                        />
                    </a>
                </div>
                <div className='carousel__item'>
                    <a href='#' className='carousel__link'>
                        <h4 className='carousel__subtitle'>
                            <small>Share your message</small>Voice Over
                        </h4>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png'
                            alt=''
                            className='carousel__image'
                        />
                    </a>
                </div>
                <div className='carousel__item'>
                    <a href='#' className='carousel__link'>
                        <h4 className='carousel__subtitle'>
                            <small>Engage your audience</small>Video Explainer
                        </h4>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png'
                            alt=''
                            className='carousel__image'
                        />
                    </a>
                </div>
                <div className='carousel__item'>
                    <a href='#' className='carousel__link'>
                        <h4 className='carousel__subtitle'>
                            <small>Engage your audience</small>Video Explainer
                        </h4>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png'
                            alt=''
                            className='carousel__image'
                        />
                    </a>
                </div>
            </Slider>
        </div>
    );
};

export default PopularServiceCarousel;
