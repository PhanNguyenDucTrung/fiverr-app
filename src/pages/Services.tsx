import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Spin, Alert } from 'antd';
import axiosInstance from '../utils/api';

interface Job {
    key: string;
    title: string;
    description: string;
}

const Jobs: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axiosInstance.get<Job[]>('/services');
                const jobsData = response.data.map((job, index) => ({ ...job, key: String(index) }));
                setJobs(jobsData);
            } catch (err) {
                setError('Failed to fetch jobs');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddJob = (values: Omit<Job, 'key'>) => {
        const newJob = {
            key: `${jobs.length + 1}`,
            title: values.title,
            description: values.description,
        };
        setJobs([...jobs, newJob]);
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
            {loading ? (
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Spin size='large' />
                </div>
            ) : error ? (
                <Alert message='Error' description={error} type='error' showIcon />
            ) : (
                <Table columns={columns} dataSource={jobs} />
            )}
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
