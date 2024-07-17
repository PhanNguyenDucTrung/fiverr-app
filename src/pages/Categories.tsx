import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Spin, message } from 'antd';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
    fetchCategories,
    fetchSubcategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../redux/reducers/categoriesSlice';

const { Column } = Table;
const { confirm } = Modal;

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
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categoriesReducer.categories);
    const loading = useAppSelector(state => state.categoriesReducer.loading);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [form] = Form.useForm();
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleEditCategory = async (category: Category) => {
        setEditingCategory(category);
        form.setFieldsValue({ name: category.name });
        const { subcategories } = await dispatch(fetchSubcategories(category.id)).unwrap();
        setSubcategories(subcategories);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingCategory) {
                await dispatch(updateCategory({ ...editingCategory, ...values })).unwrap();
                message.success('Category updated successfully');
            } else {
                await dispatch(createCategory(values)).unwrap();
                message.success('Category created successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Failed to save category');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const showDeleteConfirm = (id: string) => {
        confirm({
            title: 'Are you sure you want to delete this category?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await dispatch(deleteCategory(id)).unwrap();
                    message.success('Category deleted successfully');
                } catch (error) {
                    message.error('Failed to delete category');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div>
            <h1>Categories</h1>
            <Spin spinning={loading}>
                <Table dataSource={categories} rowKey='id' style={{ marginTop: 20 }}>
                    <Column title='ID' dataIndex='id' key='id' />
                    <Column title='Category Name' dataIndex='name' key='name' />
                    <Column
                        title='Actions'
                        key='action'
                        render={(_text, record: Category) => (
                            <Space size='middle'>
                                <Button
                                    style={{
                                        color: 'blue',
                                        borderColor: 'blue',
                                    }}
                                    onClick={() => handleEditCategory(record)}>
                                    Edit
                                </Button>
                                <Button danger onClick={() => showDeleteConfirm(record.id)}>
                                    Delete
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            <Modal
                title={editingCategory ? 'Edit Category' : 'Add Category'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        name='name'
                        label='Category Name'
                        rules={[{ required: true, message: 'Please enter the category name' }]}>
                        <Input />
                    </Form.Item>
                    {editingCategory && (
                        <Form.Item label='Subcategories'>
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
