import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space } from 'antd';
import axios from 'axios';

const { Column } = Table;

const Categories: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
    };

    const handleAddCategory = () => {
        setEditingCategory(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditCategory = category => {
        setEditingCategory(category);
        form.setFieldsValue({ name: category.name });
        setIsModalVisible(true);
    };

    const handleDeleteCategory = async categoryId => {
        await axios.delete(`http://localhost:3000/api/categories/${categoryId}`);
        fetchCategories();
    };

    const handleOk = async () => {
        const values = form.getFieldsValue();

        if (editingCategory) {
            await axios.put(`http://localhost:3000/api/categories/${editingCategory.id}`, values);
        } else {
            await axios.post('http://localhost:3000/api/categories', values);
        }

        fetchCategories();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button type='primary' onClick={handleAddCategory}>
                Thêm danh mục
            </Button>
            <Table dataSource={categories} rowKey='id' style={{ marginTop: 20 }}>
                <Column title='ID' dataIndex='id' key='id' />
                <Column title='Tên danh mục' dataIndex='name' key='name' />
                <Column
                    title='Hành động'
                    key='action'
                    render={(text, record) => (
                        <Space size='middle'>
                            <Button onClick={() => handleEditCategory(record)}>Sửa</Button>
                            <Button danger onClick={() => handleDeleteCategory(record.id)}>
                                Xóa
                            </Button>
                        </Space>
                    )}
                />
            </Table>
            <Modal
                title={editingCategory ? 'Sửa danh mục' : 'Thêm danh mục'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Form form={form} layout='vertical'>
                    <Form.Item
                        name='name'
                        label='Tên danh mục'
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Categories;
