// MainTemplate.tsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoriesMenu from '../components/CategoriesMenu';
import { useEffect } from 'react';

const MainTemplate: React.FC = () => {
    const location = useLocation();
    const isHomePath = (path: string) => path === '/' || path === '/home';
    const [isHomePage, setIsHomePage] = useState(isHomePath(location.pathname));
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setIsHomePage(isHomePath(location.pathname));
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Header isHomePage={isHomePage} scrollY={scrollY} />
            <CategoriesMenu
                className={
                    isHomePage
                        ? scrollY <= 200
                            ? 'categories-menu-hidden'
                            : 'categories-menu-fixed'
                        : 'categories-menu-relative'
                }
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
export default MainTemplate;
