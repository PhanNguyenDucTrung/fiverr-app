import { useEffect, useState } from 'react';
import { Layout, Menu, message } from 'antd';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Logo from '../components/Header/Logo';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    AppstoreOutlined,
    FileDoneOutlined,
    HomeOutlined,
} from '@ant-design/icons';

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
    }, [role, navigate]);

    const menuItems = [
        {
            key: '1',
            icon: <UserOutlined />,
            label: <NavLink to='/admin/users'>User Management</NavLink>,
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <NavLink to='/admin/jobs'>Job List Management</NavLink>,
        },
        {
            key: '3',
            icon: <FileDoneOutlined />,
            label: <NavLink to='/admin/orders'>Order Management</NavLink>,
        },
        {
            key: '4',
            icon: <AppstoreOutlined />,
            label: <NavLink to='/admin/categories'>Category Management</NavLink>,
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <NavLink to='/'>
                    <div
                        className='logo'
                        style={{
                            height: '32px',
                            background: 'transparent',
                            margin: '16px',
                            fontSize: '20px',
                            padding: '0 14px',
                            lineHeight: '32px',
                            textAlign: 'center',
                        }}>
                        {collapsed ? (
                            <HomeOutlined style={{ color: 'white', fontSize: '24px' }} />
                        ) : (
                            <span style={{ color: 'white' }}>
                                <Logo isHomePage={true} scrollY={0} />
                            </span>
                        )}
                    </div>
                </NavLink>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']} items={menuItems} />
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
