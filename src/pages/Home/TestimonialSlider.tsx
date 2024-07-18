import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { PlayCircleOutlined } from '@ant-design/icons';
import VideoModal from '../../components/VideoModal';

const testimonials = [
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173414/testimonial-video-still-naadam.jpg',
        name: 'Brighid Gannon (DNP, PMHNP-BC)',
        title: 'Co-Founder',
        companyLogo:
            'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/rooted-logo-x2.321d79d.png',
        testimonial:
            'We used Fiverr for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/plfa6gdjihpdvr10rchl',
    },
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173396/testimonial-video-still-lavender.jpg',
        name: 'John Doe',
        title: 'CEO',
        companyLogo:
            'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/naadam-logo-x2.0a3b198.png',
        testimonial:
            'Fiverr has been an essential partner in our growth. Their platform made it easy to find the right talent quickly.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/rb8jtakrisiz0xtsffwi',
    },
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173399/testimonial-video-still-rooted.jpg',
        name: 'Jane Smith',
        title: 'Marketing Director',
        companyLogo:
            'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lavender-logo-x2.89c5e2e.png',
        testimonial:
            'The results from Fiverr have consistently exceeded our expectations. We couldn’t be happier with the quality of work.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/yja2ld5fnolhsixj3xxw',
    },
    {
        videoTeaser:
            'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_560,dpr_1.0/v1/attachments/generic_asset/asset/42a6fd208670a0361b38bd72b47b9317-1599519173395/testimonial-video-still-haerfest.jpg',
        name: 'Jane Smith',
        title: 'Marketing Director',
        companyLogo:
            'https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/haerfest-logo-x2.03fa5c5.png',
        testimonial:
            'The results from Fiverr have consistently exceeded our expectations. We couldn’t be happier with the quality of work.',
        videoUrl: 'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/bsncmkwya3nectkensun',
    },
];

const CustomNextArrow = props => {
    const { onClick } = props;
    return (
        <div className='testimonial-slider__arrow testimonial-slider__arrow--next' onClick={onClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#333' width='24px' height='24px'>
                <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z' />
            </svg>
        </div>
    );
};

const CustomPrevArrow = props => {
    const { onClick } = props;
    return (
        <div className='testimonial-slider__arrow testimonial-slider__arrow--prev' onClick={onClick}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#333' width='24px' height='24px'>
                <path d='M15.41 7.41L10.83 12l4.58 4.59L14 18l-6-6 6-6z' />
            </svg>
        </div>
    );
};

const TestimonialSlider = () => {
    const sliderRef = useRef<Slider | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,

        afterChange: (current: number) => {
            if (current === testimonials.length - 1 && sliderRef.current) {
                setTimeout(() => {
                    sliderRef.current?.slickGoTo(0);
                }, 1000);
            }
        },
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                },
            },
        ],
    };

    const openModal = videoUrl => {
        setCurrentVideoUrl(videoUrl);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentVideoUrl('');
    };

    return (
        <div className='testimonial-slider'>
            <Slider ref={sliderRef} {...settings}>
                {testimonials.map((item, index) => (
                    <div key={index}>
                        <div className='testimonial-slider__slide'>
                            <div className='testimonial-slider__video-thumbnail'>
                                <img
                                    src={item.videoTeaser}
                                    alt='Video Teaser'
                                    className='testimonial-slider__video-teaser'
                                    onClick={() => openModal(item.videoUrl)}
                                />
                                <button
                                    className='testimonial-slider__play-button'
                                    onClick={() => openModal(item.videoUrl)}>
                                    <PlayCircleOutlined className='testimonial-slider__play-icon' />
                                </button>
                            </div>
                            <div className='testimonial-slider__text-content'>
                                <div className='testimonial-slider__info'>
                                    <h5 className='testimonial-slider__name'>
                                        {item.name}, {item.title}
                                    </h5>
                                    <div className='testimonial-slider__logo-wrapper'>
                                        <img
                                            src={item.companyLogo}
                                            alt='Company Logo'
                                            className='testimonial-slider__company-logo'
                                        />
                                    </div>
                                </div>
                                <p className='testimonial-slider__testimonial'>
                                    "<em>{item.testimonial}</em>"
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <VideoModal isOpen={modalIsOpen} onRequestClose={closeModal} videoUrl={currentVideoUrl} />
        </div>
    );
};

export default TestimonialSlider;
