// src/components/Sidebar.tsx
import React, { useEffect, useRef } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { Category } from '../models/Category';

interface SidebarProps {
    categories: Category[];
    isVisible: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, isVisible, onClose }) => {
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Russian'];
    const currencies = [
        'US Dollar (USD)',
        'Euro (EUR)',
        'British Pound (GBP)',
        'Japanese Yen (JPY)',
        'Australian Dollar (AUD)',
        'Canadian Dollar (CAD)',
        'Swiss Franc (CHF)',
        'Chinese Yuan (CNY)',
    ];

    const menuItems = [
        { key: 'login', label: 'Login' },
        { key: 'join', label: 'Join' },
        {
            key: 'browse-categories',
            label: 'Browse Categories',
            children: categories.map(category => ({
                key: `category-${category.id}`,
                label: category.name,
                children: category.subcategories.map(subcategory => ({
                    key: subcategory.id,
                    label: (
                        <NavLink
                            to={`/categories/${category.name.toLowerCase().replace(/\s/g, '-')}/${subcategory.name
                                .toLowerCase()
                                .replace(/\s/g, '-')}`}>
                            {subcategory.name}
                        </NavLink>
                    ),
                })),
            })),
        },
        {
            key: 'explore',
            label: 'Explore',
            children: [
                { key: 'about-us', label: <NavLink to='/about-us'>About Us</NavLink> },
                { key: 'contact', label: <NavLink to='/contact'>Contact</NavLink> },
                { key: 'faq', label: <NavLink to='/faq'>FAQ</NavLink> },
                { key: 'support', label: <NavLink to='/support'>Support</NavLink> },
            ],
        },
        {
            key: 'languages',
            label: 'Languages',
            children: languages.map(language => ({
                key: language,
                label: language,
            })),
        },
        {
            key: 'currencies',
            label: 'Currencies',
            children: currencies.map(currency => ({
                key: currency,
                label: <NavLink to={`/currencies/${currency.toLowerCase().replace(/\s/g, '-')}`}>{currency}</NavLink>,
            })),
        },
    ];

    return (
        <>
            {isVisible && <div className='overlay' onClick={onClose}></div>}
            <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`} ref={sidebarRef}>
                <Menu mode='inline' items={menuItems} style={{ marginTop: '20px' }} />
            </div>
        </>
    );
};

export default Sidebar;
