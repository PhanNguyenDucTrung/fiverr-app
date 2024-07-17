import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Spin, Alert } from 'antd';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchUsers, deleteUser } from '../redux/reducers/usersSlice';
import axiosInstance from '../utils/api';

const Users: React.FC = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(state => state.usersReducer.users);
    const loading = useAppSelector(state => state.usersReducer.loading);
    const error = useAppSelector(state => state.usersReducer.error);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState<{ username: string; id: string } | null>(null);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleEdit = record => {
        setEditingUser(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async (userId: string) => {
        try {
            await dispatch(deleteUser(userId)).unwrap();
            message.success('User deleted successfully');
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            if (editingUser) {
                await axiosInstance.put(`/users/${editingUser.id}`, values);
                message.success('User updated successfully');
            } else {
                await axiosInstance.post('/users', values);
                message.success('User added successfully');
            }
            form.resetFields();
            setIsModalVisible(false);
            setEditingUser(null);
            dispatch(fetchUsers()); // Refresh the users list
        } catch (error) {
            message.error('Failed to save user');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingUser(null);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_text, record) => (
                <Space size='middle'>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Users Management</h1>
            <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                Add User
            </Button>
            <Spin spinning={loading}>
                {error ? (
                    <Alert message='Error' description={error} type='error' showIcon />
                ) : (
                    <Table columns={columns} dataSource={users} rowKey='id' />
                )}
            </Spin>
            <Modal
                title={editingUser ? 'Edit User' : 'Add User'}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={() => form.resetFields()}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        name='username'
                        label='Name'
                        rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[{ required: true, message: 'Please input the email!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;
