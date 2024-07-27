import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Spin, Modal, Form, message } from 'antd';
import { EditOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchCategories, updateCategory, createCategory, deleteCategory } from '../../redux/reducers/categoriesSlice';
import CategoryModal from './CategoryModal';
import type { Key } from 'react';

const { Column } = Table;
const { confirm } = Modal;

interface Category {
    id: string;
    name: string;
}

const Categories: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(state => state.categoriesReducer.categories);
    const loading = useAppSelector(state => state.categoriesReducer.loading);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        form.setFieldsValue({ name: category.name });
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
        });
    };

    const onSelectChange = (newSelectedRowKeys: Key[], _selectedRows: Category[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleEditDetails = (id: string) => {
        navigate(`/admin/categories/${id}/edit`);
    };

    return (
        <div>
            <h1>Categories</h1>
            <Button type='primary' onClick={() => setIsModalVisible(true)} style={{ marginBottom: 20 }}>
                Add Category
            </Button>
            <Spin spinning={loading}>
                <Table dataSource={categories} rowKey='id' rowSelection={rowSelection} style={{ marginTop: 20 }}>
                    <Column title='ID' dataIndex='id' key='id' />
                    <Column title='Category Name' dataIndex='name' key='name' />
                    <Column
                        title='Actions'
                        key='action'
                        render={(_, record: Category) => (
                            <Space size='middle'>
                                <Button
                                    type='default'
                                    onClick={() => handleEditCategory(record)}
                                    icon={<EditOutlined />}
                                    style={{ color: 'blue', borderColor: 'blue' }}>
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    onClick={() => showDeleteConfirm(record.id)}
                                    icon={<DeleteOutlined />}
                                    style={{ color: 'red', borderColor: 'red' }}>
                                    Delete
                                </Button>
                                <Button
                                    type='default'
                                    onClick={() => handleEditDetails(record.id)}
                                    icon={<FileTextOutlined />}
                                    style={{ color: 'green', borderColor: 'green' }}>
                                    Edit Details
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            <CategoryModal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                form={form}
                editingCategory={editingCategory}
            />
        </div>
    );
};

export default Categories;
