import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { addCategory, updateCategory } from '../utils/api';

interface Category {
    id?: number;
    name: string;
}

interface CategoryFormProps {
    category: Category | null;
    onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onClose }) => {
    const [form] = Form.useForm();

    const onFinish = async (values: Category) => {
        try {
            if (category && category.id) {
                await updateCategory(category.id, values);
                message.success('Category updated successfully');
            } else {
                await addCategory(values);
                message.success('Category added successfully');
            }
            onClose();
        } catch (error) {
            message.error('Failed to save category');
        }
    };

    return (
        <Form form={form} initialValues={category || { name: '' }} onFinish={onFinish}>
            <Form.Item
                name='name'
                label='Category Name'
                rules={[{ required: true, message: 'Please enter the category name' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryForm;
