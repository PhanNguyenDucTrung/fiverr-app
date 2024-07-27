import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Space, Spin, message, Modal, Form } from 'antd';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchChildCategories, updateChildCategory, deleteChildCategory } from '../../redux/reducers/categoriesSlice';
import ChildCategoryModal from './ChildCategoryModal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Column } = Table;

interface ChildCategory {
    id: string;
    name: string;
}

const ChildCategoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const childCategories = useAppSelector(state => state.categoriesReducer.selectedChildCategories);
    const loading = useAppSelector(state => state.categoriesReducer.loading);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingChildCategory, setEditingChildCategory] = useState<ChildCategory | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (id) {
            dispatch(fetchChildCategories(id));
        }
    }, [dispatch, id]);

    const handleEditChildCategory = (childCategory: ChildCategory) => {
        message.info('You are editing the child category with ID ' + childCategory.id);
        setEditingChildCategory(childCategory);
        form.setFieldsValue({ name: childCategory.name });
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingChildCategory) {
                await dispatch(
                    updateChildCategory({ subcategoryId: id!, childCategory: { ...editingChildCategory, ...values } })
                ).unwrap();
                message.success('Child category updated successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Failed to save child category');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const showDeleteConfirm = (childCategoryId: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this child category?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await dispatch(deleteChildCategory({ subcategoryId: id!, childCategoryId })).unwrap();
                    message.success('Child category deleted successfully');
                } catch (error) {
                    message.error('Failed to delete child category');
                }
            },
        });
    };

    return (
        <div>
            <h1>Child Categories of Subcategory {id}</h1>
            <Spin spinning={loading}>
                <Table dataSource={childCategories} rowKey='id' style={{ marginTop: 20 }}>
                    <Column title='ID' dataIndex='id' key='id' />
                    <Column title='Child Category Name' dataIndex='name' key='name' />
                    <Column
                        title='Actions'
                        key='action'
                        render={(_, record: ChildCategory) => (
                            <Space size='middle'>
                                <Button
                                    type='default'
                                    onClick={() => handleEditChildCategory(record)}
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
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
            <ChildCategoryModal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                form={form}
                editingChildCategory={editingChildCategory}
            />
        </div>
    );
};

export default ChildCategoryDetails;
