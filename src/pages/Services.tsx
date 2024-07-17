import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Spin, Alert } from 'antd';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { fetchServices, createService } from '../redux/reducers/servicesSlice';

const Jobs: React.FC = () => {
    const dispatch = useAppDispatch();
    const services = useAppSelector(state => state.servicesReducer.services);
    const loading = useAppSelector(state => state.servicesReducer.loading);
    const error = useAppSelector(state => state.servicesReducer.error);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddJob = async (values: { title: string; description: string }) => {
        await dispatch(createService(values));
        setIsModalVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'Job Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
    ];

    return (
        <div>
            <h1>Jobs Management</h1>
            <Button type='primary' onClick={showModal} style={{ marginBottom: 16 }}>
                Add Job
            </Button>
            <Spin spinning={loading}>
                {error ? (
                    <Alert message='Error' description={error} type='error' showIcon />
                ) : (
                    <Table columns={columns} dataSource={services} rowKey='id' />
                )}
            </Spin>
            <Modal
                title='Add Job'
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
                <Form form={form} layout='vertical' onFinish={handleAddJob}>
                    <Form.Item
                        name='title'
                        label='Job Title'
                        rules={[{ required: true, message: 'Please input the job title!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='description'
                        label='Description'
                        rules={[{ required: true, message: 'Please input the job description!' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Jobs;
