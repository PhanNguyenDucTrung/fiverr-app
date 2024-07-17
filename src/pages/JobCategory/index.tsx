import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useParams, NavLink } from 'react-router-dom';
import { Spin } from 'antd';
import { fetchSubcategories } from '../../redux/reducers/congViecSlice';
import VideoModal from '../../components/VideoModal';
import TagsCarousel from './TagsCarousel';

import { tags } from './data';

type Category = {
    id: string;
    name: string;
};

type Subcategory = {
    name: string;
    childCategories: { name: string; id: string }[];
};

type CategoryDetails = {
    name: string;
    subcategories: Subcategory[];
};

const JobCategory: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categoryName } = useParams<{ categoryName: string }>();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const categoriesMenu = useAppSelector(state => state.congViecReducer.categoriesMenu) as Category[];
    const categoryDetails = useAppSelector(state => state.congViecReducer.categoryDetails) as CategoryDetails | null;

    useEffect(() => {
        if (categoryName) {
            const category = categoriesMenu.find(
                (c: Category) => c.name.toLowerCase().replace(/\s/g, '-') === categoryName
            );
            if (category) {
                dispatch(fetchSubcategories(category.id));
            }
        }
    }, [categoryName, categoriesMenu, dispatch]);

    if (!categoryDetails) {
        return <Spin />;
    }

    const { name, subcategories } = categoryDetails;

    return (
        <div>
            <div className='banner-section'>
                <div className='max-width-container'>
                    <div className='hero-banner-wrapper'>
                        <div className='banner-content'>
                            <h1 className='title'>{name}</h1>
                            <p>Designs to make you stand out.</p>
                            <button onClick={() => setModalIsOpen(true)}>
                                <i className='fas fa-play'></i> How Fiverr Works
                            </button>
                        </div>
                    </div>
                    <VideoModal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        videoUrl='https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/vmvv3czyk2ifedefkau7'
                    />
                </div>
            </div>

            <div className='popular-tags-section max-width-container'>
                <h2 className='popular-tags-section__title'>Most Popular in {name}</h2>
                <TagsCarousel />
            </div>

            <div className='categories-section'>
                <div className='max-width-container'>
                    <h5>Explore {name}</h5>
                    <div className='categories-menu'>
                        {subcategories?.map((subcategory: Subcategory) => (
                            <div key={subcategory.name} className='category-item'>
                                <div className='image-placeholder'></div>
                                <h3>{subcategory.name}</h3>
                                <ul>
                                    {subcategory.childCategories.map(childCategory => (
                                        <li key={childCategory.id}>
                                            <NavLink
                                                to={`/categories/${name
                                                    .toLowerCase()
                                                    .replace(/\s/g, '-')}/${subcategory.name
                                                    ?.toLowerCase()
                                                    .replace(/\s/g, '-')}/${childCategory.name
                                                    .toLowerCase()
                                                    .replace(/\s/g, '-')}/${childCategory.id}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}>
                                                <span>{childCategory.name}</span>

                                                <i className='fas fa-arrow-right'></i>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='related-tags max-width-container'>
                <h2>You might be interested in</h2>
                <div className='tags-container'>
                    {tags.map((tag, index) => (
                        <button key={index} className='tag-button'>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobCategory;
