import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag } from 'antd';
import axiosInstance from '../utils/api';

const { Option } = Select;

interface Order {
    id: string;
    service: {
        title: string;
        description: string;
    };
    buyer: {
        username: string;
    };
    seller: {
        username: string;
    };
    price: number;
    deliveryDate: string;
    status: string;
}

const Orders: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get<Order[]>('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddOrder = (values: Omit<Order, 'id'>) => {
        const newOrder = {
            id: `${orders.length + 1}`,
            service: {
                title: values.service.title,
                description: values.service.description,
            },
            buyer: {
                username: values.buyer.username,
            },
            seller: {
                username: values.seller.username,
            },
            price: values.price,
            deliveryDate: values.deliveryDate,
            status: values.status,
        };
        setOrders([...orders, newOrder]);
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Order Name',
            dataIndex: ['service', 'title'],
            key: 'serviceTitle',
        },
        {
            title: 'Description',
            dataIndex: ['service', 'description'],
            key: 'serviceDescription',
        },
        {
            title: 'Buyer',
            dataIndex: ['buyer', 'username'],
            key: 'buyerUsername',
        },
        {
            title: 'Seller',
            dataIndex: ['seller', 'username'],
            key: 'sellerUsername',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            render: (date: string) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color;
                switch (status.toLowerCase()) {
                    case 'pending':
                        color = 'orange';
                        break;
                    case 'in_progress':
                        color = 'blue';
                        break;
                    case 'cancelled':
                        color = 'red';
                        break;
                    case 'completed':
                        color = 'green';
                        break;
                    default:
                        color = 'gray';
                        break;
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
    ];

    return (
        <div>
            <h1>Order Management</h1>
            <Button type='primary' onClick={showModal} style={{ marginBottom: 16 }}>
                Add Order
            </Button>
            <Table columns={columns} dataSource={orders.map(order => ({ ...order, key: order.id }))} />
            <Modal
                title='Add Order'
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key='submit' type='primary' onClick={() => form.submit()}>
                        Add
                    </Button>,
                ]}>
                <Form form={form} layout='vertical' onFinish={handleAddOrder}>
                    <Form.Item
                        name={['service', 'title']}
                        label='Order Name'
                        rules={[{ required: true, message: 'Please input the order name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['service', 'description']}
                        label='Description'
                        rules={[{ required: true, message: 'Please input the order description!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['buyer', 'username']}
                        label='Buyer Username'
                        rules={[{ required: true, message: 'Please input the buyer username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['seller', 'username']}
                        label='Seller Username'
                        rules={[{ required: true, message: 'Please input the seller username!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='price'
                        label='Price'
                        rules={[{ required: true, message: 'Please input the price!' }]}>
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item
                        name='deliveryDate'
                        label='Delivery Date'
                        rules={[{ required: true, message: 'Please input the delivery date!' }]}>
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item
                        name='status'
                        label='Status'
                        rules={[{ required: true, message: 'Please select the order status!' }]}>
                        <Select placeholder='Select a status'>
                            <Option value='Pending'>Pending</Option>
                            <Option value='In Progress'>In Progress</Option>
                            <Option value='Completed'>Completed</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Orders;
