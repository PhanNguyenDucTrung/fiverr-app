// import React from 'react';
import { Modal, Form, Input } from 'antd';

const CategoryModal = ({ visible, onOk, onCancel, form, editingCategory }) => {
    return (
        <Modal
            title={editingCategory ? 'Edit Category' : 'Add Category'}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText={editingCategory ? 'Update' : 'Create'}
            cancelText='Cancel'>
            <Form form={form} layout='vertical'>
                <Form.Item
                    name='name'
                    label='Category Name'
                    rules={[{ required: true, message: 'Please enter the category name' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoryModal;
