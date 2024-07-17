import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircleOutlined } from '@ant-design/icons';
import TestimonialSlider from '../../components/TestimonialSlider';
import VideoModal from '../../components/VideoModal';
import CheckIcon from '../../components/CheckIcon';
import PopularServiceCarousel from './PopularServiceCarousel';
import { sellingPropositions } from './data';

const Home = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/result/?search=${encodeURIComponent(searchTerm)}`);
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
        <>
            <div className='hero-wrapper'>
                <div className='max-width-container hero'>
                    <div className='header'>
                        <h1 className='header-title'>
                            Find the perfect
                            <em
                                style={{
                                    fontFamily: 'Playfair Display, serif',
                                }}>
                                {' '}
                                freelance{' '}
                            </em>
                            service for your business
                        </h1>

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
                    <span className='trusted-by-text'>Trusted by:</span>
                    <ul>
                        <li>
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
                                    alt='Meta'
                                />
                            </picture>
                        </li>
                        <li>
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
                        <li>
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
                                    alt='Netflix'
                                />
                            </picture>
                        </li>
                        <li>
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

            <div className='popular-services-wrapper max-width-container'>
                <PopularServiceCarousel />
            </div>

            <div className='selling-proposition-wrapper lohp-row'>
                <div className='selling-proposition max-width-container lohp-inner-row'>
                    <div className='selling-content'>
                        <div className='selling-text'>
                            <h2>A whole world of freelance talent at your fingertips</h2>
                            <ul>
                                {sellingPropositions.map((item, index) => (
                                    <li key={index}>
                                        <h6 className='heading'>
                                            <span className='check-icon'>
                                                <CheckIcon />
                                            </span>
                                            {item.heading}
                                        </h6>
                                        <p className='tbody-4'>{item.text}</p>
                                    </li>
                                ))}
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
                                onClick={() =>
                                    openModal(
                                        'https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7'
                                    )
                                }
                            />
                            <button className='play-button' onClick={() => setModalIsOpen(true)}>
                                <PlayCircleOutlined
                                    style={{
                                        color: 'white',
                                        fontSize: 50,
                                    }}
                                />
                            </button>
                        </div>
                        <VideoModal isOpen={modalIsOpen} onRequestClose={closeModal} videoUrl={currentVideoUrl} />
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
        </>
    );
};
export default Home;
