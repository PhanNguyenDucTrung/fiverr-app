import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Modal from 'react-modal';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TestimonialSlider from '../components/TestimonialSlider';
// import { fetchCongViecByTen } from '../redux/reducers/congViecSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
const NextArrow = ({
    className,
    style,
    onClick,
}: {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
}) => {
    return (
        <button className={className} style={{ ...style }} onClick={onClick}>
            <FaChevronRight style={{ color: '#62646a', fontSize: '25px' }} />
        </button>
    );
};

const PrevArrow = ({
    className,
    style,
    onClick,
}: {
    className: string;
    style: React.CSSProperties;
    onClick: () => void;
}) => {
    return (
        <button className={className} style={{ ...style }} onClick={onClick}>
            <FaChevronLeft style={{ color: '#62646a', fontSize: '25px' }} />
        </button>
    );
};

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const settings = {
        speed: 400,
        arrows: true,
        initialSlide: 0,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: (
            <NextArrow
                className={''}
                style={{}}
                onClick={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        ),
        prevArrow: (
            <PrevArrow
                className={''}
                style={{}}
                onClick={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        ),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024, // Adjusted breakpoint for iPad
                settings: {
                    slidesToShow: 2, // Display two slides per view
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 414,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // dispatch(fetchCongViecByTen(searchTerm));
        navigate(`/result/?search=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div>
            <Header />

            <div className='hero-wrapper'>
                <div
                    className='max-width-container hero'
                    style={{
                        width: '100%',
                        display: 'flex',
                    }}>
                    <div className='header'>
                        <h1 className='header-title'>
                            Find the perfect{' '}
                            <em
                                style={{
                                    fontFamily: 'Playfair Display, serif',
                                }}>
                                freelance
                            </em>{' '}
                            service for your business
                        </h1>

                        {/* search field */}
                        <div className='search-container home-search'>
                            <input
                                type='text'
                                placeholder='Search for any service...'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <button type='submit' onClick={handleSubmit}>
                                <i className='fa fa-search'></i>
                            </button>
                        </div>

                        {/* popular */}
                        <div className='popular'>
                            Popular:
                            <ul>
                                <li>
                                    <a href=''>Web Design</a>
                                </li>
                                <li>
                                    <a href=''>Word Press</a>
                                </li>
                                <li>
                                    <a href=''>Logo Design</a>
                                </li>
                                <li>
                                    <a href=''>Dropshipping</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='trusted-by-wrapper lohp-row'>
                <div className='max-width-container trusted-by'>
                    <span className='trusted-by-text'>Trusted by:</span>{' '}
                    <ul>
                        <li className=''>
                            <picture>
                                <source
                                    media='(max-width: 899px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.99a0dda.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta2x.d8d5bc3.png 2x'
                                />
                                <source
                                    media='(min-width: 900px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta2x.b364aec.png 2x'
                                />
                                <img
                                    src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png'
                                    alt='facebook'
                                />
                            </picture>
                        </li>
                        <li className=''>
                            <picture>
                                <source
                                    media='(max-width: 899px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.9d71a37.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google2x.0053d08.png 2x'
                                />
                                <source
                                    media='(min-width: 900px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google2x.4fa6c20.png 2x'
                                />
                                <img
                                    src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png'
                                    alt='Google'
                                />
                            </picture>
                        </li>
                        <li className=''>
                            <picture>
                                <source
                                    media='(max-width: 899px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.35dc5cd.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix2x.9022712.png 2x'
                                />
                                <source
                                    media='(min-width: 900px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix2x.6b36ad6.png 2x'
                                />
                                <img
                                    src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png'
                                    alt='NETFLIX'
                                />
                            </picture>
                        </li>
                        <li className=''>
                            <picture>
                                <source
                                    media='(max-width: 899px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.967b1ad.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg2x.6665fbe.png 2x'
                                />
                                <source
                                    media='(min-width: 900px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg2x.0d06f7b.png 2x'
                                />
                                <img
                                    src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png'
                                    alt='P&G'
                                />
                            </picture>
                        </li>
                        <li className='display-from-sm'>
                            <picture>
                                <source
                                    media='(max-width: 899px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.910e738.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal2x.bd199ac.png 2x'
                                />
                                <source
                                    media='(min-width: 900px)'
                                    srcSet='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png 1x, https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal2x.d2fa54d.png 2x'
                                />
                                <img
                                    src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png'
                                    alt='PayPal'
                                />
                            </picture>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='max-width-container'>
                <div className='subcategory-carousel lohp-row'>
                    <h2>Popular Services</h2>
                    <Slider {...settings}>
                        <div className='subcategory-wrapper'>
                            <a href='#' className='subcategory'>
                                <h4>
                                    <small>Add talent to AI</small>AI Artists
                                </h4>
                                <img
                                    src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161247/ai-artists-2x.png'
                                    alt='Ai Artists'
                                />
                            </a>
                        </div>
                        <div className='subcategory-wrapper'>
                            <a href='#' className='subcategory'>
                                <h4>
                                    <small>Build your brand</small>Logo Design
                                </h4>
                                <img
                                    src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/logo-design-2x.png'
                                    alt=''
                                />
                            </a>
                        </div>
                        <div className='subcategory-wrapper'>
                            <a href='#' className='subcategory'>
                                <h4>
                                    <small>Customize your site</small>WordPress
                                </h4>
                                <img
                                    src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161257/wordpress-2x.png'
                                    alt=''
                                />
                            </a>
                        </div>

                        <div className='subcategory-wrapper'>
                            <a href='#' className='subcategory'>
                                <h4>
                                    <small>Share your message</small>Voice Over
                                </h4>
                                <img
                                    src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161253/voice-over-2x.png'
                                    alt=''
                                />
                            </a>
                        </div>
                        <div className='subcategory-wrapper'>
                            <a href='#' className='subcategory'>
                                <h4>
                                    <small>Engage your audience</small>Video Explainer
                                </h4>
                                <img
                                    src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_255,dpr_2.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161245/animated-explainer-2x.png'
                                    alt=''
                                />
                            </a>
                        </div>
                        <div className='subcategory-wrapper'>
                            <a href='#' className='subcategory'>
                                <h4>
                                    <small>Engage your audience</small>Video Explainer
                                </h4>
                                <img
                                    src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_550,dpr_1.0/v1/attachments/generic_asset/asset/7ead3b2056987e6fa3aad69cf897a50b-1690383161249/social-2x.png'
                                    alt=''
                                />
                            </a>
                        </div>
                    </Slider>
                </div>
            </div>

            <div className='selling-proposition-wrapper lohp-row'>
                <div className='selling-proposition max-width-container lohp-inner-row'>
                    <div className='selling-content'>
                        <div className='selling-text'>
                            <h2>A whole world of freelance talent at your fingertips</h2>
                            <ul>
                                <li>
                                    <h6 className='heading'>
                                        <span className='check-icon'>
                                            <svg
                                                width='16'
                                                height='16'
                                                viewBox='0 0 16 16'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z'></path>
                                                <path d='M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z'></path>
                                            </svg>
                                        </span>
                                        The best for every budget
                                    </h6>
                                    <p className='tbody-4'>
                                        Find high-quality services at every price point. No hourly rates, just
                                        project-based pricing.
                                    </p>
                                </li>
                                <li>
                                    <h6 className='heading'>
                                        <span className='check-icon'>
                                            <svg
                                                width='16'
                                                height='16'
                                                viewBox='0 0 16 16'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z'></path>
                                                <path d='M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z'></path>
                                            </svg>
                                        </span>
                                        Quality work done quickly
                                    </h6>
                                    <p className='tbody-4'>
                                        Find the right freelancer to begin working on your project within minutes.
                                    </p>
                                </li>

                                <li>
                                    <h6 className='heading'>
                                        <span className='check-icon'>
                                            <svg
                                                width='16'
                                                height='16'
                                                viewBox='0 0 16 16'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z'></path>
                                                <path d='M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z'></path>
                                            </svg>
                                        </span>
                                        Protected payments, every time
                                    </h6>
                                    <p className='tbody-4'>
                                        Always know what you'll pay upfront. Your payment isn't released until you
                                        approve the work.
                                    </p>
                                </li>

                                <li>
                                    <h6 className='heading'>
                                        <span className='check-icon'>
                                            <svg
                                                width='16'
                                                height='16'
                                                viewBox='0 0 16 16'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path d='M8 1.75C4.54822 1.75 1.75 4.54822 1.75 8C1.75 11.4518 4.54822 14.25 8 14.25C11.4518 14.25 14.25 11.4518 14.25 8C14.25 4.54822 11.4518 1.75 8 1.75ZM0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8Z'></path>
                                                <path d='M11.5303 5.46967C11.8232 5.76256 11.8232 6.23744 11.5303 6.53033L7.53033 10.5303C7.23744 10.8232 6.76256 10.8232 6.46967 10.5303L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L7 8.93934L10.4697 5.46967C10.7626 5.17678 11.2374 5.17678 11.5303 5.46967Z'></path>
                                            </svg>
                                        </span>
                                        24/7 support
                                    </h6>
                                    <p className='tbody-4'>
                                        Questions? Our round-the-clock support team is available to help anytime,
                                        anywhere.
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div
                            className='selling-video'
                            style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <img
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    cursor: 'pointer',
                                }}
                                src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_2.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png'
                                alt=''
                                onClick={() => setModalIsOpen(true)}
                            />{' '}
                            <button
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setModalIsOpen(true)}>
                                <img
                                    width='100%'
                                    height='100%'
                                    src='data:image/png;base64,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'
                                    alt='Play video'
                                />
                            </button>
                        </div>

                        <Modal
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
            </div>

            <div className='max-width-container'>
                <TestimonialSlider />
            </div>

            <div className='main-categories max-width-container lohp-row'>
                <h2>Explore the marketplace</h2>
                <ul className='categories-list'>
                    <li>
                        <a href='/categories/graphics-design?source=hplo_cat_sec&pos=1'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.91dfe44.svg'
                                alt='Graphics & Design'
                                loading='lazy'
                            />
                            Graphics &amp; Design
                        </a>
                    </li>
                    <li>
                        <a href='/categories/online-marketing?source=hplo_cat_sec&pos=2'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/online-marketing.a3e9794.svg'
                                alt='Digital Marketing'
                                loading='lazy'
                            />
                            Digital Marketing
                        </a>
                    </li>
                    <li>
                        <a href='/categories/writing-translation?source=hplo_cat_sec&pos=3'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.a787f2f.svg'
                                alt='Writing & Translation'
                                loading='lazy'
                            />
                            Writing &amp; Translation
                        </a>
                    </li>
                    <li>
                        <a href='/categories/video-animation?source=hplo_cat_sec&pos=4'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.1356999.svg'
                                alt='Video & Animation'
                                loading='lazy'
                            />
                            Video &amp; Animation
                        </a>
                    </li>
                    <li>
                        <a href='/categories/music-audio?source=hplo_cat_sec&pos=5'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.ede4c90.svg'
                                alt='Music & Audio'
                                loading='lazy'
                            />
                            Music &amp; Audio
                        </a>
                    </li>
                    <li>
                        <a href='/categories/programming-tech?source=hplo_cat_sec&pos=6'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming.6ee5a90.svg'
                                alt='Programming & Tech'
                                loading='lazy'
                            />
                            Programming &amp; Tech
                        </a>
                    </li>
                    <li>
                        <a href='/categories/business?source=hplo_cat_sec&pos=7'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.fabc3a7.svg'
                                alt='Business'
                                loading='lazy'
                            />
                            Business
                        </a>
                    </li>
                    <li>
                        <a href='/categories/lifestyle?source=hplo_cat_sec&pos=8'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/lifestyle.112b348.svg'
                                alt='Lifestyle'
                                loading='lazy'
                            />
                            Lifestyle
                        </a>
                    </li>
                    <li>
                        <a href='/categories/data?source=hplo_cat_sec&pos=9'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/data.855fe95.svg'
                                alt='Data'
                                loading='lazy'
                            />
                            Data
                        </a>
                    </li>
                    <li>
                        <a href='/categories/photography?source=hplo_cat_sec&pos=10'>
                            <img
                                src='https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/photography.0cf5a3f.svg'
                                alt='Photography'
                                loading='lazy'
                            />
                            Photography
                        </a>
                    </li>
                </ul>
            </div>

            <Footer />
        </div>
    );
};
export default Home;
