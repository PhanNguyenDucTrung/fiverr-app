import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Spin } from 'antd';
import { useAppDispatch } from '../../redux/hooks';
import { updateSubcategory } from '../../redux/reducers/categoriesSlice';

interface EditSubcategoryModalProps {
    categoryId: string;
    subcategory: { id: string; name: string };
    visible: boolean;
    onClose: () => void;
}

const EditSubcategoryModal: React.FC<EditSubcategoryModalProps> = ({ categoryId, subcategory, visible, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (subcategory) {
            form.setFieldsValue({
                name: subcategory.name,
            });
        }
    }, [subcategory, form]);

    const handleFinish = async (values: { name: string }) => {
        setLoading(true);
        try {
            await dispatch(updateSubcategory({ categoryId, subcategory: { ...subcategory, name: values.name } }));
            onClose();
        } catch (error) {
            console.error('Failed to update subcategory:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title='Edit Subcategory' open={visible} onCancel={onClose} footer={null}>
            <Spin spinning={loading}>
                <Form form={form} onFinish={handleFinish} layout='vertical'>
                    <Form.Item name='name' rules={[{ required: true, message: 'Please input the subcategory name!' }]}>
                        <Input placeholder='Subcategory Name' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
                            Update Subcategory
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
};

export default EditSubcategoryModal;
