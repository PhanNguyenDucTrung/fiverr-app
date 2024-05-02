import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Modal from 'react-modal';
import { fetchCongViecByTen } from '../redux/reducers/congViecSlice';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
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
        dispatch(fetchCongViecByTen(searchTerm));
    };

    return (
        <div>
            <nav className='main-header fixed'>
                <div className='max-width-container'>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 20,
                        }}>
                        <h2 style={{ width: 150 }}>
                            <a href='#' className='site-logo'>
                                <svg
                                    width='89'
                                    height='27'
                                    viewBox='0 0 89 27'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <g fill='#404145'>
                                        <path d='m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z'></path>
                                    </g>
                                    <g fill='#1dbf73'>
                                        <path d='m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z'></path>
                                    </g>
                                </svg>
                            </a>
                        </h2>
                        <ul
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 20,
                            }}>
                            <a className='nav-link' href='#'>
                                Become a Seller
                            </a>
                            <NavLink className='nav-link' to='/login'>
                                Sign in
                            </NavLink>
                            <NavLink className='nav-link nav-link-join' to='/register'>
                                Join
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </nav>

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
                        <div className='search-container'>
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
                                    <h6>
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
                                    <h6>
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
                                    <h6>
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
                                    <h6>
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
                                    backgroundColor: '#f4f4f4',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '0',
                                    margin: '0',
                                    width: '85%',
                                    maxWidth: '800px',
                                    height: '455px',
                                    overflow: 'hidden',
                                },
                                overlay: {
                                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                },
                            }}>
                            <video
                                width='100%'
                                height='100%'
                                style={{
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

            <footer>
                <div className='footer-wrapper max-width-container'>
                    <div className='footer-top'>
                        <div className='footer-column'>
                            <div>
                                <h6>Categories</h6>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href='#'>Graphics & Design</a>
                                    </li>
                                    <li>
                                        <a href='#'>Digital Marketing</a>
                                    </li>
                                    <li>
                                        <a href='#'>Writing & Translation</a>
                                    </li>
                                    <li>
                                        <a href='#'>Video & Animation</a>
                                    </li>
                                    <li>
                                        <a href='#'>Music & Audio</a>
                                    </li>
                                    <li>
                                        <a href='#'>Programming & Tech</a>
                                    </li>
                                    <li>
                                        <a href='#'>Data</a>
                                    </li>
                                    <li>
                                        <a href='#'>Business</a>
                                    </li>
                                    <li>
                                        <a href='#'>Lifestyle</a>
                                    </li>
                                    <li>
                                        <a href='#'>Sitemap</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-column'>
                            <div>
                                <h6>About</h6>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href='#'>Careers</a>
                                    </li>
                                    <li>
                                        <a href='#'>Press & News</a>
                                    </li>
                                    <li>
                                        <a href='#'>Partnerships</a>
                                    </li>
                                    <li>
                                        <a href='#'>Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href='#'>Terms of Service</a>
                                    </li>
                                    <li>
                                        <a href='#'>Intellectual Property Claims</a>
                                    </li>
                                    <li>
                                        <a href='#'>Investor Rotations</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-column'>
                            <div>
                                <h6>Support</h6>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href='#'>Help & Support</a>
                                    </li>
                                    <li>
                                        <a href='#'>Trust & Safety</a>
                                    </li>
                                    <li>
                                        <a href='#'>Selling on Fiverr</a>
                                    </li>
                                    <li>
                                        <a href='#'>Buying on Fiverr</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-column'>
                            <div>
                                <h6>Community</h6>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href='#'>Events</a>
                                    </li>
                                    <li>
                                        <a href='#'>Blog</a>
                                    </li>
                                    <li>
                                        <a href='#'>Forum</a>
                                    </li>
                                    <li>
                                        <a href='#'>Community Standards</a>
                                    </li>
                                    <li>
                                        <a href='#'>Podcast</a>
                                    </li>
                                    <li>
                                        <a href='#'>Affiliates</a>
                                    </li>
                                    <li>
                                        <a href='#'>Invite a Friend</a>
                                    </li>
                                    <li>
                                        <a href='#'>Become a Seller</a>
                                    </li>
                                    <li>
                                        <a href='#'>Fiverr Elevate</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-column'>
                            <div>
                                <h6>More From Fiverr</h6>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <a href='#'>Fiverr Business</a>
                                    </li>
                                    <li>
                                        <a href='#'>Fiverr Pro</a>
                                    </li>
                                    <li>
                                        <a href='#'>Fiverr Studios</a>
                                    </li>
                                    <li>
                                        <a href='#'>Fiverr Logo Maker</a>
                                    </li>
                                    <li>
                                        <a href='#'>Fiverr Guides</a>
                                    </li>
                                    <li>
                                        <a href='#'>Get Inspired</a>
                                    </li>
                                    <li>
                                        <a href='#'>ClearVoice</a>
                                    </li>
                                    <li>
                                        <a href='#'>AND CO</a>
                                    </li>
                                    <li>
                                        <a href='#'>Learn</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Info */}
                    <div className='bottom'>
                        <div className='left'>
                            <span>
                                <svg
                                    width='91'
                                    height='27'
                                    viewBox='0 0 91 27'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <g fill='#7A7D85'>
                                        <path d='m82.9 13.1h-3.2c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-13.4h-2.6c-2.1 0-3.2 1.5-3.2 4.1v9.3h-6.1v-18.4h6.1v2.8c1-2.2 2.4-2.8 4.4-2.8h7.4v2.8c1-2.2 2.4-2.8 4.4-2.8h2v5zm-25.6 5.6h-12.6c.3 2.1 1.6 3.2 3.8 3.2 1.6 0 2.8-.7 3.1-1.8l5.4 1.5c-1.3 3.2-4.6 5.1-8.5 5.1-6.6 0-9.6-5.1-9.6-9.5 0-4.3 2.6-9.4 9.2-9.4 7 0 9.3 5.2 9.3 9.1 0 .9 0 1.4-.1 1.8zm-5.9-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3.1.8-3.4 3zm-23.1 11.3h5.3l6.7-18.3h-6.1l-3.2 10.7-3.4-10.8h-6.1zm-24.9 0h6v-13.4h5.7v13.4h6v-18.4h-11.6v-1.1c0-1.2.9-2 2.3-2h3.5v-5h-4.4c-4.5 0-7.5 2.7-7.5 6.6v1.5h-3.4v5h3.4z'></path>
                                    </g>
                                    <g fill='#7A7D85'>
                                        <path d='m90.4 23.3c0 2.1-1.6 3.7-3.8 3.7s-3.8-1.6-3.8-3.7 1.6-3.7 3.8-3.7c2.2-.1 3.8 1.5 3.8 3.7zm-.7 0c0-1.8-1.3-3.1-3.1-3.1s-3.1 1.3-3.1 3.1 1.3 3.1 3.1 3.1 3.1-1.4 3.1-3.1zm-1.7.8.1.9h-.7l-.1-.9c0-.3-.2-.5-.5-.5h-.8v1.4h-.7v-3.5h1.4c.7 0 1.2.4 1.2 1.1 0 .4-.2.6-.5.8.4.1.5.3.6.7zm-1.9-1h.7c.4 0 .5-.3.5-.5 0-.3-.2-.5-.5-.5h-.7z'></path>
                                    </g>
                                </svg>
                            </span>
                            <p className='legal'>
                                <span className='copyright'>© Fiverr International Ltd. 2024</span>
                            </p>
                        </div>

                        <div className='right'>
                            <ul className='social'>
                                <li>
                                    <a href='#' className='social-link'>
                                        <i className='fa-brands fa-twitter'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='social-link'>
                                        <i className='fa-brands fa-facebook'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='social-link'>
                                        <i className='fa-brands fa-linkedin'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='social-link'>
                                        <i className='fa-brands fa-pinterest'></i>
                                    </a>
                                </li>
                                <li>
                                    <a href='#' className='social-link'>
                                        <i className='fa-brands fa-instagram'></i>
                                    </a>
                                </li>
                            </ul>
                            <p>
                                <span>
                                    <svg width='18' height='18' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M9 1C4.58875 1 1 4.58875 1 9C1 13.4113 4.58875 17 9 17C13.4113 17 17 13.4113 17 9C17 4.58875 13.4113 1 9 1ZM8.53125 4.92676C7.81812 4.89612 7.11218 4.7959 6.43811 4.63293C6.54578 4.37781 6.6626 4.13281 6.78857 3.90063C7.30542 2.94824 7.93994 2.27991 8.53125 2.03784V4.92676ZM8.53125 5.86499V8.53125H5.60339C5.64465 7.4906 5.82202 6.45752 6.11536 5.51782C6.8927 5.71362 7.70874 5.83215 8.53125 5.86499ZM8.53125 9.46875V12.135C7.70874 12.1678 6.8927 12.2864 6.11536 12.4822C5.82202 11.5425 5.64465 10.5094 5.60339 9.46875H8.53125ZM8.53125 13.0732V15.9622C7.93994 15.7201 7.30542 15.0518 6.78857 14.0994C6.6626 13.8672 6.54578 13.6222 6.43811 13.3671C7.11218 13.2041 7.81799 13.1039 8.53125 13.0732ZM9.46875 13.0732C10.1819 13.1039 10.8878 13.2041 11.5619 13.3671C11.4542 13.6222 11.3374 13.8672 11.2114 14.0994C10.6946 15.0518 10.0601 15.7201 9.46875 15.9622V13.0732ZM9.46875 12.135V9.46875H12.3966C12.3553 10.5094 12.178 11.5425 11.8846 12.4822C11.1073 12.2864 10.2913 12.1678 9.46875 12.135ZM9.46875 8.53125V5.86499C10.2913 5.83215 11.1073 5.71362 11.8846 5.51782C12.178 6.45752 12.3553 7.4906 12.3966 8.53125H9.46875ZM9.46875 4.92676V2.03784C10.0601 2.27991 10.6946 2.94824 11.2114 3.90063C11.3374 4.13281 11.4542 4.37781 11.5619 4.63293C10.8878 4.7959 10.1819 4.89612 9.46875 4.92676ZM12.0354 3.45349C11.8007 3.02087 11.5457 2.63953 11.2769 2.31421C12.2141 2.63428 13.0631 3.14636 13.7771 3.8031C13.3699 4.02124 12.931 4.21069 12.4694 4.36902C12.3384 4.0509 12.1936 3.74487 12.0354 3.45349ZM5.9646 3.45349C5.8064 3.74487 5.66162 4.0509 5.53064 4.36902C5.06897 4.21069 4.63013 4.02112 4.2229 3.8031C4.93689 3.14636 5.78589 2.63428 6.72314 2.31421C6.45435 2.63953 6.19946 3.02075 5.9646 3.45349ZM5.2135 5.25012C4.89355 6.27368 4.70544 7.38953 4.66492 8.53125H1.95349C2.05383 7.00769 2.63892 5.61438 3.5564 4.50525C4.06555 4.79724 4.62317 5.047 5.2135 5.25012ZM4.66492 9.46875C4.70544 10.6106 4.89355 11.7263 5.2135 12.7499C4.62317 12.953 4.06555 13.2028 3.5564 13.4948C2.63892 12.3856 2.05383 10.9923 1.95349 9.46875H4.66492ZM5.53064 13.631C5.66162 13.9491 5.8064 14.2551 5.9646 14.5465C6.19946 14.9791 6.45435 15.3605 6.72314 15.6858C5.78589 15.3657 4.93689 14.8536 4.22302 14.1969C4.63 13.9789 5.06897 13.7893 5.53064 13.631ZM12.0354 14.5465C12.1936 14.2551 12.3384 13.9491 12.4694 13.631C12.931 13.7893 13.3699 13.9789 13.7771 14.1969C13.0631 14.8536 12.2141 15.3657 11.2769 15.6858C11.5457 15.3605 11.8005 14.9792 12.0354 14.5465ZM12.7865 12.7499C13.1064 11.7263 13.2946 10.6105 13.3351 9.46875H16.0465C15.9462 10.9923 15.3611 12.3856 14.4436 13.4948C13.9344 13.2028 13.3768 12.953 12.7865 12.7499ZM13.3351 8.53125C13.2946 7.3894 13.1064 6.27368 12.7865 5.25012C13.3768 5.047 13.9344 4.79724 14.4436 4.50525C15.3611 5.61438 15.9462 7.00769 16.0465 8.53125H13.3351Z'
                                            strokeWidth='0.2'></path>
                                    </svg>
                                </span>

                                <span>English</span>
                            </p>
                            <p>$USD</p>
                            <p></p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Home;
