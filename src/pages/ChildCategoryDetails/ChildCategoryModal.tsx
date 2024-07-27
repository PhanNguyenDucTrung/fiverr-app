import React from 'react';
import { Modal, Form, Input } from 'antd';

interface ChildCategoryModalProps {
    visible: boolean;
    onOk: () => void;
    onCancel: () => void;
    form: any;
    editingChildCategory: { id: string; name: string } | null;
}

const ChildCategoryModal: React.FC<ChildCategoryModalProps> = ({
    visible,
    onOk,
    onCancel,
    form,
    editingChildCategory,
}) => {
    return (
        <Modal
            title={editingChildCategory ? 'Edit Child Category' : 'Add Child Category'}
            open={visible}
            onOk={onOk}
            onCancel={onCancel}>
            <Form form={form} layout='vertical'>
                <Form.Item
                    name='name'
                    label='Child Category Name'
                    rules={[{ required: true, message: 'Please input the name of the child category!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ChildCategoryModal;
