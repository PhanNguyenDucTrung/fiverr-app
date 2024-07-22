import React, { useEffect, useRef, forwardRef } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCategoriesMenu, fetchSubcategories } from '../redux/reducers/congViecSlice';
import { Menu, Popover } from 'antd';
import { useParams, useNavigate, NavLinkProps, NavLink as RouterNavLink } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { ConfigProvider } from 'antd';

// Define the props and ref types for NavLink
type Ref = HTMLAnchorElement;
const NavLink = forwardRef<Ref, NavLinkProps>((props, ref) => <RouterNavLink ref={ref} {...props} />);

type ChildCategory = {
    id: string;
    name: string;
};

type Subcategory = {
    id: string;
    name: string;
    childCategories: ChildCategory[];
};

type Category = {
    id: string;
    name: string;
    subcategories: Subcategory[];
};

interface CategoriesMenuProps {
    className?: string;
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const categoriesMenu = useAppSelector(state => state.congViecReducer?.categoriesMenu) as Category[];
    const { categoryName } = useParams<{ categoryName: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategoriesMenu());
    }, [dispatch]);

    useEffect(() => {
        if (categoryName) {
            const category = categoriesMenu.find(
                (c: Category) => c.name.toLowerCase().replace(/\s/g, '-') === categoryName
            );
            if (category) {
                dispatch(fetchSubcategories(category.id));
            } else {
                // navigate('/404');
            }
        }
    }, [categoryName, categoriesMenu, dispatch, navigate]);

    const renderSubmenuContent = (subcategory: Subcategory, categoryName: string) => (
        <div key={`${categoryName}-${subcategory.id}`}>
            <h3 style={{ marginBottom: '8px' }}>{subcategory.name}</h3>
            {subcategory.childCategories.map(childCategory => (
                <NavLink
                    style={{ display: 'block', marginBottom: '8px' }}
                    key={childCategory.id}
                    to={`/categories/${categoryName.toLowerCase().replace(/\s/g, '-')}/${subcategory.name
                        .toLowerCase()
                        .replace(/\s/g, '-')}/${childCategory.name.toLowerCase().replace(/\s/g, '-')}/${
                        childCategory.id
                    }`}
                    className='submenu-item-link child-category-link'>
                    {childCategory.name}
                </NavLink>
            ))}
        </div>
    );

    const transformCategoriesToMenuItems = (categories: Category[]) => {
        return categories.map(category => {
            const subcategoriesContent = (
                <Masonry
                    breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
                    className='masonry-grid'
                    columnClassName='masonry-grid_column'>
                    {category.subcategories.map(subcategory => (
                        <div key={subcategory.id} className='masonry-item'>
                            {renderSubmenuContent(subcategory, category.name)}
                        </div>
                    ))}
                </Masonry>
            );

            return {
                key: category.id,
                label: (
                    <Popover zIndex={1030} placement='bottom' trigger='hover' content={subcategoriesContent}>
                        <NavLink
                            to={`/categories/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                            className='menu-item-link'>
                            {category.name}
                        </NavLink>
                    </Popover>
                ),
            };
        });
    };

    const menuItems = transformCategoriesToMenuItems(categoriesMenu);

    return (
        <div className={`categories-menu ${className}`} ref={menuRef}>
            <ConfigProvider
                theme={{
                    components: {
                        Popover: {
                            zIndexPopup: 1030,
                            sizePopupArrow: 0,
                        },
                        Menu: {
                            itemColor: '#62646A',
                            horizontalItemHoverColor: '#74767E',
                            horizontalItemSelectedColor: ' #1dbf73 ',
                        },
                    },
                }}>
                <div className='max-width-container'>
                    <Menu mode='horizontal' items={menuItems} />
                </div>
            </ConfigProvider>
        </div>
    );
};

export default CategoriesMenu;
