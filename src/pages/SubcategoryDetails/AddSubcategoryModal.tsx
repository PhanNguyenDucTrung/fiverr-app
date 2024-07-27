import React, { useState } from 'react';
import { Modal, Form, Input, Button, Spin } from 'antd';
import { useAppDispatch } from '../../redux/hooks';
import { createSubcategory } from '../../redux/reducers/categoriesSlice';

interface AddSubcategoryModalProps {
    categoryId: string;
    visible: boolean;
    onClose: () => void;
}

const AddSubcategoryModal: React.FC<AddSubcategoryModalProps> = ({ categoryId, visible, onClose }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleFinish = async (values: { name: string }) => {
        setLoading(true);
        try {
            await dispatch(createSubcategory({ categoryId, subcategory: { name: values.name } }));
            onClose(); // Close the modal on successful submission
        } catch (error) {
            console.error('Failed to create subcategory:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title='Add Subcategory' open={visible} onCancel={onClose} footer={null}>
            <Spin spinning={loading}>
                <Form onFinish={handleFinish} layout='vertical'>
                    <Form.Item name='name' rules={[{ required: true, message: 'Please input the subcategory name!' }]}>
                        <Input placeholder='Subcategory Name' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                            Add Subcategory
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default AddSubcategoryModal;
