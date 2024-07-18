import { Layout, Menu, message } from 'antd';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

const { Header, Sider, Content } = Layout;

const AdminTemplate: React.FC = () => {
    const role = useAppSelector(state => state.authReducer.role);
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        if (role !== 'admin') {
            message.error('You are not authorized to access this page');
            navigate('/');
        }
    }, [role]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <NavLink to='/'>
                    <div
                        className='logo'
                        style={{
                            height: '32px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            margin: '16px',
                            color: 'white',
                            fontSize: '20px',
                            padding: '0 14px',
                            lineHeight: '32px',
                            textAlign: 'center',
                        }}>
                        <span style={{ color: 'white' }}>Home</span>
                    </div>
                </NavLink>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1' icon={<UserOutlined />}>
                        <NavLink to='/admin/users'>Quản lý người dùng</NavLink>
                    </Menu.Item>
                    <Menu.Item key='2' icon={<VideoCameraOutlined />}>
                        <NavLink to='/admin/jobs'>Quản lý danh sách công việc</NavLink>
                    </Menu.Item>
                    <Menu.Item key='3' icon={<FileDoneOutlined />}>
                        <NavLink to='/admin/orders'>Quản lý công việc đặt hàng</NavLink>
                    </Menu.Item>
                    <Menu.Item key='4' icon={<AppstoreOutlined />}>
                        <NavLink to='/admin/categories'>Quản lý danh mục</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className='site-layout'>
                <Header className='site-layout-background' style={{ padding: 0 }}>
                    {collapsed ? (
                        <MenuUnfoldOutlined className='trigger' onClick={toggle} />
                    ) : (
                        <MenuFoldOutlined className='trigger' onClick={toggle} />
                    )}
                </Header>
                <Content
                    className='site-layout-background'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminTemplate;
