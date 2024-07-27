import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import CircleOutline from './CircleOutline';
import EarthIcon from './EarthIcon';
import FiverrLogo from './FiverrLogo';

const Footer = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const footerContent = [
        {
            key: '1',
            label: 'Categories',
            children: (
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
            ),
        },
        {
            key: '2',
            label: 'About',
            children: (
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
            ),
        },
        {
            key: '3',
            label: 'Support',
            children: (
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
            ),
        },
        {
            key: '4',
            label: 'Community',
            children: (
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
            ),
        },
        {
            key: '5',
            label: 'More From Fiverr',
            children: (
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
            ),
        },
    ];

    return (
        <footer className='footer'>
            <div className='footer__wrapper max-width-container'>
                <div className='footer__top'>
                    {isSmallScreen ? (
                        <Collapse accordion items={footerContent} />
                    ) : (
                        footerContent.map(section => (
                            <div className='footer__column' key={section.key}>
                                <div className='footer__article'>
                                    <div className='footer__title-wrapper'>
                                        <h6 className='footer__title'>{section.label}</h6>
                                    </div>
                                    {section.children}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Info */}
                <div className='footer__bottom'>
                    <div className='footer__info footer__info--left'>
                        <span>
                            <FiverrLogo />
                        </span>
                        <p className='footer__legal'>
                            <span className='footer__copyright'>© Fiverr International Ltd. 2024</span>
                        </p>
                    </div>

                    <div className='footer__info footer__info--right'>
                        <ul className='footer__social'>
                            <li>
                                <a href='#' className='footer__social-link'>
                                    <i className='fa-brands fa-twitter'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#' className='footer__social-link'>
                                    <i className='fa-brands fa-facebook'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#' className='footer__social-link'>
                                    <i className='fa-brands fa-linkedin'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#' className='footer__social-link'>
                                    <i className='fa-brands fa-pinterest'></i>
                                </a>
                            </li>
                            <li>
                                <a href='#' className='footer__social-link'>
                                    <i className='fa-brands fa-instagram'></i>
                                </a>
                            </li>
                        </ul>

                        <div className='footer__info-wrapper'>
                            <p className='footer__selection-language'>
                                <span>
                                    <EarthIcon />
                                </span>
                                <span>English</span>
                            </p>
                            <p
                                className='footer__currency-info'
                                style={{
                                    color: '#7A7D85',
                                    fontWeight: 600,
                                }}>
                                US $USD
                            </p>
                            <p>
                                <CircleOutline />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
