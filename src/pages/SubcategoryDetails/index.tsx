import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Space, Spin } from 'antd';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { fetchSubcategories, deleteSubcategory } from '../../redux/reducers/categoriesSlice';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import AddSubcategoryModal from './AddSubcategoryModal';
import EditSubcategoryModal from './EditSubcategoryModal';

const { Column } = Table;

interface Subcategory {
    id: string;
    name: string;
}

const SubcategoryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const subcategories = useAppSelector(state => state.categoriesReducer.selectedSubcategories);
    const loading = useAppSelector(state => state.categoriesReducer.loading);
    const navigate = useNavigate();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchSubcategories(id));
        }
    }, [dispatch, id]);

    const handleViewChildCategories = (subcategoryId: string) => {
        navigate(`/admin/subcategories/${subcategoryId}/child-categories`);
    };

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    const hideAddModal = () => {
        setIsAddModalVisible(false);
        if (id) {
            dispatch(fetchSubcategories(id));
        }
    };

    const showEditModal = (subcategory: Subcategory) => {
        setEditingSubcategory(subcategory);
        setIsEditModalVisible(true);
    };

    const hideEditModal = () => {
        setIsEditModalVisible(false);
        setEditingSubcategory(null);
        if (id) {
            dispatch(fetchSubcategories(id));
        }
    };

    const handleDelete = async (subcategoryId: string) => {
        await dispatch(deleteSubcategory({ categoryId: id!, subcategoryId }));
        if (id) {
            dispatch(fetchSubcategories(id));
        }
    };

    return (
        <div>
            <h1>Subcategories of Category {id}</h1>
            <Button type='primary' onClick={showAddModal} style={{ marginBottom: 20 }}>
                Add Subcategory
            </Button>
            <AddSubcategoryModal categoryId={id!} visible={isAddModalVisible} onClose={hideAddModal} />
            {editingSubcategory && (
                <EditSubcategoryModal
                    categoryId={id!}
                    subcategory={editingSubcategory}
                    visible={isEditModalVisible}
                    onClose={hideEditModal}
                />
            )}
            <Spin spinning={loading}>
                <Table dataSource={subcategories} rowKey='id' style={{ marginTop: 20 }}>
                    <Column title='ID' dataIndex='id' key='id' />
                    <Column title='Subcategory Name' dataIndex='name' key='name' />
                    <Column
                        title='Actions'
                        key='action'
                        render={(_, record: Subcategory) => (
                            <Space size='middle'>
                                <Button
                                    type='default'
                                    icon={<EditOutlined />}
                                    onClick={() => showEditModal(record)}
                                    style={{ color: 'blue', borderColor: 'blue' }}>
                                    Edit
                                </Button>
                                <Button
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => handleDelete(record.id)}
                                    style={{ color: 'red', borderColor: 'red' }}>
                                    Delete
                                </Button>
                                <Button
                                    type='default'
                                    onClick={() => handleViewChildCategories(record.id)}
                                    icon={<EditOutlined />}
                                    style={{ color: 'green', borderColor: 'green' }}>
                                    View Child Categories
                                </Button>
                            </Space>
                        )}
                    />
                </Table>
            </Spin>
        </div>
    );
};

export default SubcategoryDetails;
