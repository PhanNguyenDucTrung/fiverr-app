import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import axiosInstance from '../utils/api';

const { Column } = Table;

interface Category {
    id: string;
    name: string;
    subcategories?: Subcategory[];
}

interface Subcategory {
    id: string;
    name: string;
}

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [form] = Form.useForm();
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get<Category[]>('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchSubcategories = async (categoryId: string) => {
        try {
            const response = await axiosInstance.get<Category>(`/categories/${categoryId}`);
            setSubcategories(response.data.subcategories || []);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleEditCategory = async (category: Category) => {
        setEditingCategory(category);
        form.setFieldsValue({ name: category.name });
        fetchSubcategories(category.id);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingCategory) {
                await axiosInstance.put(`/categories/${editingCategory.id}`, values);
            } else {
                await axiosInstance.post('/categories', values);
            }
            fetchCategories();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error handling form submission:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDeleteCategory = async (id: string) => {
        try {
            await axiosInstance.delete(`/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div>
            <Table dataSource={categories} rowKey='id' style={{ marginTop: 20 }}>
                <Column title='ID' dataIndex='id' key='id' />
                <Column title='Tên danh mục' dataIndex='name' key='name' />
                <Column
                    title='Hành động'
                    key='action'
                    render={(_text, record: Category) => (
                        <Space size='middle'>
                            <Button onClick={() => handleEditCategory(record)}>Sửa</Button>
                            <Button onClick={() => handleDeleteCategory(record.id)}>Xóa</Button>
                        </Space>
                    )}
                />
            </Table>
            <Modal
                title={editingCategory ? 'Sửa danh mục' : 'Thêm danh mục'}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        name='name'
                        label='Tên danh mục'
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
                        <Input />
                    </Form.Item>
                    {editingCategory && (
                        <Form.Item label='Danh sách subcategories'>
                            <ul>
                                {subcategories.map((subcategory: Subcategory) => (
                                    <li key={subcategory.id}>{subcategory.name}</li>
                                ))}
                            </ul>
                        </Form.Item>
                    )}
                </Form>
            </Modal>
        </div>
    );
};

export default Categories;
