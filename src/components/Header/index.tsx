// src/components/Header.tsx
import React, { FormEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined, BellOutlined, ProfileOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserProfile, clearToken } from '../../redux/reducers/authSlice';
import { useSearchHandler } from '../../utils/seachHandler';
import { setSearchTerm } from '../../redux/reducers/searchSlice';
import hamburger from '../../assets/hamburger.svg';
import Logo from './Logo';

interface HeaderProps {
    isHomePage: boolean;
    scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ isHomePage, scrollY }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector(state => state.searchReducer.searchTerm); // Get the search term from Redux state
    const { token, profile } = useAppSelector(state => state.authReducer);
    const profilePicture = profile?.profilePicture;
    const handleSearch = useSearchHandler();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile());
        }
    }, [token, dispatch]);

    const handleSignOut = () => {
        dispatch(clearToken());
        navigate('/login');
    };

    const menuItems = [
        {
            key: 'profile',
            label: 'View Profile',
            icon: <ProfileOutlined />,
            onClick: () => navigate('/profile'),
        },
        {
            key: 'notifications',
            label: 'Notifications',
            icon: <BellOutlined />,
        },
        {
            key: 'signout',
            label: 'Sign Out',
            icon: <LogoutOutlined />,
            onClick: handleSignOut,
        },
    ];

    return (
        <div className={`header-wrapper ${isHomePage ? (scrollY > 200 ? 'scrolled' : 'home') : 'default'}`}>
            <div className='header-row-wrapper'>
                <div className='max-width-container header-row'>
                    <button
                        type='button'
                        style={{ backgroundColor: 'transparent', border: 'none' }}
                        className='btn-navicon'>
                        <img src={hamburger} alt='menu' />
                    </button>
                    <NavLink to='/' className='site-logo'>
                        <Logo isHomePage={isHomePage} scrollY={scrollY} />
                    </NavLink>
                    <div className={`search-container header-search ${isHomePage && scrollY <= 280 ? '' : 'visible'}`}>
                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='Search for any service...'
                                value={searchTerm}
                                onChange={e => dispatch(setSearchTerm(e.target.value))} // Update search term in Redux state
                                aria-label='Search services'
                            />
                            <button type='submit'>
                                <i className='fa fa-search' aria-hidden='true'></i>
                            </button>
                        </form>
                    </div>
                    <nav className='fiverr-nav'>
                        <ul className='nav-items'>
                            <li className='display-from-xl' style={{ paddingRight: '0' }}>
                                <button className='nav-link nav-link-lang'>Fiverr Business</button>
                            </li>
                            <li className='display-from-xl'>
                                <button className='nav-link nav-link-lang'>
                                    <i className='fa fa-globe' aria-hidden='true'></i> English
                                </button>
                            </li>
                            <li className='display-from-lg'>
                                <NavLink to='/link1' className='nav-link'>
                                    Become a Seller
                                </NavLink>
                            </li>
                            {token ? (
                                <li>
                                    <Dropdown menu={{ items: menuItems }} trigger={['click']} placement='bottom'>
                                        <Space>
                                            <Avatar
                                                src={profilePicture}
                                                alt='profile'
                                                icon={<UserOutlined />}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </Space>
                                    </Dropdown>
                                </li>
                            ) : (
                                <>
                                    <li className='display-from-md'>
                                        <NavLink to='/login' className='nav-link'>
                                            Sign in
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/register' className='nav-link nav-link-join'>
                                            Join
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;
