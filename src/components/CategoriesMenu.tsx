import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
    fetchMenuLoaiCongViec,
    fetchCongViecTheoChiTietLoai,
    fetchChiTietLoaiCongViec,
} from '../redux/reducers/congViecSlice';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';

type Category = {
    dsChiTietLoai: [];
    dsNhomChiTietLoai: [];
    id: number;
    tenLoaiCongViec: string;
};
type MenuItem = Required<MenuProps>['items'][number];

interface CategoriesMenuProps {
    className?: string;
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({ className }) => {
    const dispatch = useAppDispatch();
    const menuLoaiCongViec: Category[] = useAppSelector(state => state.congViecReducer.menuLoaiCongViec);

    const items: MenuItem[] = menuLoaiCongViec.map(category => ({
        label: (
            <NavLink
                to={`/categories/${category.tenLoaiCongViec.toLowerCase().replace(/\s/g, '-')}`}
                className='menu-item-link'
                onClick={() => {
                    dispatch(fetchChiTietLoaiCongViec(category.id));
                }}>
                {category.tenLoaiCongViec}
            </NavLink>
        ),
        key: category.id.toString(),
        children: (
            category.dsNhomChiTietLoai as { tenNhom: string; dsChiTietLoai: { tenChiTiet: string; id: number }[] }[]
        ).map(subcategory => ({
            type: 'group',
            label: <span style={{ color: '#404145', fontWeight: 500 }}>{subcategory.tenNhom}</span>,
            children: subcategory.dsChiTietLoai.map((item: { tenChiTiet: string; id: number }) => {
                return {
                    label: (
                        <NavLink
                            to={`/categories/${category.tenLoaiCongViec
                                .toLowerCase()
                                .replace(/\s/g, '-')}/${subcategory.tenNhom.toLowerCase()}/${item.tenChiTiet
                                .toLowerCase()
                                .replace(/\s/g, '-')}/${item.id}`}
                            className='submenu-item-link'
                            style={{ color: '#62646a' }}
                            onClick={() => {
                                console.log(item.id);
                                dispatch(fetchCongViecTheoChiTietLoai(item.id));
                            }}>
                            {item.tenChiTiet}
                        </NavLink>
                    ),
                    key: nanoid(),
                };
            }),
        })),
    }));

    useEffect(() => {
        dispatch(fetchMenuLoaiCongViec());
    }, [dispatch]);

    return (
        <div className={`categories-menu ${className}`}>
            <div className='max-width-container'>
                <Menu mode='horizontal' items={items} />
            </div>
        </div>
    );
};

export default CategoriesMenu;
