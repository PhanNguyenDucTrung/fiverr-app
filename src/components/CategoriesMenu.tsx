import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCategoriesMenu, fetchSubcategories } from '../redux/reducers/congViecSlice';
import { Menu, Popover } from 'antd';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { ConfigProvider } from 'antd';

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
    const categoriesMenu = useAppSelector(state => state.congViecReducer?.categoriesMenu) as Category[];
    // console.log(categoriesMenu);
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

    const renderSubmenuContent = (subcategory: Subcategory, categoryName) => (
        <div key={`${categoryName}-${subcategory.id}`}>
            <h3 style={{ marginBottom: '8px' }}>{subcategory.name}</h3>
            {subcategory.childCategories.map(childCategory => (
                <NavLink
                    style={{ display: 'block', marginBottom: '8px' }}
                    key={childCategory.id}
                    to={`/categories/${categoryName?.toLowerCase().replace(/\s/g, '-')}/${subcategory.name
                        ?.toLowerCase()
                        .replace(/\s/g, '-')}/${childCategory.name.toLowerCase().replace(/\s/g, '-')}/${
                        childCategory.id
                    }`}
                    className='submenu-item-link child-category-link'>
                    {childCategory.name}
                </NavLink>
            ))}
        </div>
    );

    const renderMenuItems = () =>
        categoriesMenu.map(category => (
            <Menu.Item key={category.id}>
                {category.subcategories.length > 0 ? (
                    <Popover
                        placement='bottom'
                        trigger='hover'
                        content={
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
                        }>
                        <div>
                            <NavLink
                                to={`/categories/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                                className='menu-item-link'>
                                {category.name}
                            </NavLink>
                        </div>
                    </Popover>
                ) : (
                    <div>
                        <NavLink
                            to={`/categories/${category.name.toLowerCase().replace(/\s/g, '-')}`}
                            className='menu-item-link'>
                            {category.name}
                        </NavLink>
                    </div>
                )}
            </Menu.Item>
        ));

    return (
        <div className={`categories-menu ${className}`}>
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
                    <Menu mode='horizontal'>{renderMenuItems()}</Menu>
                </div>
            </ConfigProvider>
        </div>
    );
};

export default CategoriesMenu;
