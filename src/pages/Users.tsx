import { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message } from 'antd';

import axiosInstance from '../utils/api';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState<{ username: string; id: string } | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/users');
            setUsers(response.data);
        } catch (error) {
            message.error('Failed to fetch users');
        }
        setLoading(false);
    };

    const handleEdit = record => {
        console.log(record);
        setEditingUser(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = async userId => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/users/${userId}`);
            message.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            message.error('Failed to delete user');
        }
        setLoading(false);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
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
            fetchUsers();
        } catch (error) {
            message.error('Failed to save user');
        }
        setLoading(false);
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
            key: 'name',
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
            <Button type='primary' onClick={() => setIsModalVisible(true)}>
                Add User
            </Button>
            <Table columns={columns} dataSource={users} loading={loading} rowKey='id' />
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
                        <Input value={editingUser?.username || ''} />
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
