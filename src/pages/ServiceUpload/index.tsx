import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Divider, Select, message, Popconfirm } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import axiosInstance from '../../utils/api';
import FloatInput from './FloatInput';
import ImageUpload from './ImageUpload';

import './serviceUpload.css';

const { Option } = Select;

const validator = {
    require: {
        required: true,
        message: 'Required',
    },
};

interface Category {
    id: string;
    name: string;
    subcategories: Subcategory[];
}

interface Subcategory {
    id: string;
    name: string;
    childCategories: ChildCategory[];
}

interface ChildCategory {
    id: string;
    name: string;
}

const ServiceUpload: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [childCategories, setChildCategories] = useState<ChildCategory[]>([]);
    const [isSubcategorySelected, setIsSubcategorySelected] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        axiosInstance.get('/categories').then(response => {
            setCategories(response.data);
        });

        if (serviceId) {
            axiosInstance
                .get(`/services/${serviceId}`)
                .then(response => {
                    const serviceData = response.data;
                    form.setFieldsValue(serviceData);
                    handleCategoryChange(serviceData.categoryId);
                    handleSubcategoryChange(serviceData.subcategoryId);
                })
                .catch(error => {
                    console.error('Error fetching service:', error);
                    message.error('Failed to fetch service details.');
                });
        }
    }, [serviceId]);

    const onFinish = async (values: any) => {
        if (!values.gallery || values.gallery.length === 0) {
            message.error('Please upload at least one image.');
            return;
        }

        const formDataList = values.gallery.map((file: any) => {
            const formData = new FormData();
            formData.append('file', file.originFileObj);
            formData.append('upload_preset', 'gqirzko4');
            return formData;
        });

        try {
            const uploadPromises = formDataList.map(formData =>
                axios.post('https://api.cloudinary.com/v1_1/djornofhd/image/upload', formData)
            );

            const uploadResponses = await Promise.all(uploadPromises);
            const imageUrls = uploadResponses.map(response => response.data.secure_url);

            const payload = {
                ...values,
                gallery: imageUrls,
            };

            if (serviceId) {
                const response = await axiosInstance.put(`/services/${serviceId}`, payload);
                if (response.status === 200) {
                    message.success('Service updated successfully!');
                    navigate('/services');
                } else {
                    message.error('Failed to update service.');
                }
            } else {
                const response = await axiosInstance.post('/services', payload);
                if (response.status === 201) {
                    message.success('Service created successfully!');
                    navigate('/services');
                } else {
                    message.error('Failed to create service.');
                }
            }
        } catch (error) {
            console.error('Error creating/updating service:', error);
            message.error('Failed to create/update service.');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Please fill out all required fields.');
    };

    const handleDeleteService = async () => {
        try {
            const response = await axiosInstance.delete(`/services/${serviceId}`);
            if (response.status === 200) {
                message.success('Service deleted successfully!');
                navigate('/services');
            } else {
                message.error('Failed to delete service.');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            message.error('Failed to delete service.');
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        const selectedCategory = categories.find(category => category.id === categoryId);
        if (selectedCategory) {
            setSubcategories(selectedCategory.subcategories);
            setChildCategories([]);
            setIsSubcategorySelected(false);
            form.setFieldsValue({ subcategoryId: undefined, childCategoryId: undefined });
        }
    };

    const handleSubcategoryChange = (subcategoryId: string) => {
        const selectedSubcategory = subcategories.find(subcategory => subcategory.id === subcategoryId);
        if (selectedSubcategory) {
            setChildCategories(selectedSubcategory.childCategories);
            setIsSubcategorySelected(true);
            form.setFieldsValue({ childCategoryId: undefined });
        } else {
            setIsSubcategorySelected(false);
        }
    };

    return (
        <div className='service-upload'>
            <h1>{serviceId ? 'Edit Service' : 'Upload Your Service'}</h1>
            <Form
                form={form}
                size='large'
                name='service_upload'
                layout='vertical'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                {/* Basic Information Section */}
                <Divider orientation='left'>Basic Information</Divider>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name='title' rules={[validator.require]}>
                            <FloatInput label='Service Title' placeholder='Enter your service title' />
                        </Form.Item>
                    </Col>
                    {/* Category */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name='categoryId' rules={[validator.require]}>
                            <FloatInput
                                type='select'
                                label='Category'
                                placeholder='Select a category'
                                onChange={handleCategoryChange}>
                                {categories.map(category => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </FloatInput>
                        </Form.Item>
                    </Col>
                    {/* Subcategory */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name='subcategoryId' rules={[validator.require]}>
                            <FloatInput
                                type='select'
                                label='Subcategory'
                                placeholder='Select a subcategory'
                                onChange={handleSubcategoryChange}>
                                {subcategories.map(subcategory => (
                                    <Option key={subcategory.id} value={subcategory.id}>
                                        {subcategory.name}
                                    </Option>
                                ))}
                            </FloatInput>
                        </Form.Item>
                    </Col>
                    {/* Child Category */}
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name='childCategoryId' rules={[validator.require]}>
                            <FloatInput
                                type='select'
                                label='Child Category'
                                placeholder='Select a child category'
                                disabled={!isSubcategorySelected}>
                                {childCategories.map(childCategory => (
                                    <Option key={childCategory.id} value={childCategory.id}>
                                        {childCategory.name}
                                    </Option>
                                ))}
                            </FloatInput>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                        <Form.Item name='price' rules={[validator.require]}>
                            <FloatInput label='Price ($)' placeholder='Enter your price' type='number' />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Description Section */}
                <Divider orientation='left'>Description</Divider>
                <div style={{ maxWidth: '600px' }}>
                    <Form.Item name='description' rules={[validator.require]}>
                        <FloatInput label='Service Description' placeholder='Describe your service' type='textarea' />
                    </Form.Item>
                </div>

                {/* Gallery Section */}
                <Divider orientation='left'>Gallery</Divider>
                <Form.Item
                    name='gallery'
                    rules={[
                        {
                            validator: (_: any, value: any) =>
                                value && value.length > 0
                                    ? Promise.resolve()
                                    : Promise.reject('Please upload at least one image.'),
                        },
                    ]}>
                    <ImageUpload />
                </Form.Item>

                {/* FAQ Section */}
                <Divider orientation='left'>FAQ</Divider>
                <Form.List name='faq'>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row key={key} gutter={16} align='middle'>
                                    <Col xs={24} sm={24} md={10}>
                                        <Form.Item {...restField} name={[name, 'question']} rules={[validator.require]}>
                                            <FloatInput label='Question' placeholder='Enter question' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={10}>
                                        <Form.Item {...restField} name={[name, 'answer']} rules={[validator.require]}>
                                            <FloatInput label='Answer' placeholder='Enter answer' />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={4}>
                                        <Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            ))}
                            <Row>
                                <Col xs={24} sm={24} md={{ span: 8, offset: 8 }}>
                                    <Form.Item>
                                        <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                                            Add FAQ
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form.List>

                {/* Submit and Delete Button */}
                <Row>
                    <Col xs={24} sm={24} md={{ span: 8, offset: 4 }}>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' block>
                                {serviceId ? 'Update Service' : 'Submit Service'}
                            </Button>
                        </Form.Item>
                    </Col>
                    {serviceId && (
                        <Col xs={24} sm={24} md={{ span: 8 }}>
                            <Form.Item>
                                <Popconfirm
                                    title='Are you sure you want to delete this service?'
                                    onConfirm={handleDeleteService}
                                    okText='Yes'
                                    cancelText='No'>
                                    <Button danger block icon={<DeleteOutlined />}>
                                        Delete Service
                                    </Button>
                                </Popconfirm>
                            </Form.Item>
                        </Col>
                    )}
                </Row>
            </Form>
        </div>
    );
};

export default ServiceUpload;
