import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import { getCategoryList, deleteCategory } from '../utils/api';
import CategoryForm from './CategoryForm';
interface Category {
    id: number;
    name: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await getCategoryList();
            setCategories(response.data as Category[]); // Add type assertion here
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch categories');
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteCategory(id);
            message.success('Category deleted successfully');
            fetchCategories();
        } catch (error) {
            message.error('Failed to delete category');
        }
    };

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalVisible(true);
    };

    const handleAdd = () => {
        setSelectedCategory(null);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        fetchCategories();
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: Category) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type='primary' onClick={handleAdd}>
                Add Category
            </Button>
            <Table dataSource={categories} columns={columns} loading={loading} rowKey='id' />
            <Modal
                title={selectedCategory ? 'Edit Category' : 'Add Category'}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}>
                <CategoryForm category={selectedCategory} onClose={handleModalClose} />
            </Modal>
        </>
    );
};

export default CategoryList;
