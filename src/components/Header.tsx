import { NavLink } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchUserProfile } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import hamburger from '../assets/hamburger.svg';

interface HeaderProps {
    isHomePage: boolean;
    scrollY: number;
}

const Header: React.FC<HeaderProps> = ({ isHomePage, scrollY }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const { token } = useAppSelector(state => state.authReducer);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        navigate(`/search/services?query=${encodeURIComponent(searchTerm)}`);
    };

    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile());
        }
    }, [token, dispatch]);

    return (
        <div className={`header-wrapper ${isHomePage ? (scrollY > 200 ? 'scrolled' : 'home') : 'default'}`}>
            <div className='header-row-wrapper'>
                <div className='max-width-container header-row'>
                    <button
                        type='button'
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                        }}
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
                                onChange={e => setSearchTerm(e.target.value)}
                                aria-label='Search services'
                            />
                            <button type='submit'>
                                <i className='fa fa-search' aria-hidden='true'></i>
                            </button>
                        </form>
                    </div>
                    <nav className='fiverr-nav'>
                        <ul className='nav-items'>
                            <li
                                className='display-from-xl'
                                style={{
                                    paddingRight: '0',
                                }}>
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
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Logo: React.FC<{ isHomePage: boolean; scrollY: number }> = ({ isHomePage, scrollY }) => (
    <svg width='89' height='27' viewBox='0 0 89 27' xmlns='http://www.w3.org/2000/svg'>
        <g style={{ fill: isHomePage && scrollY <= 200 ? '#fff' : '#404145' }}>
            <path d='m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z'></path>
        </g>
        <g fill='#1dbf73'>
            <path d='m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z'></path>
        </g>
    </svg>
);

export default Header;
