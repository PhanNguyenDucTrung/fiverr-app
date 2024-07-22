import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ImageUploadProps {
    value?: any[];
    onChange?: (fileList: any[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value = [], onChange }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList }: any) => {
        onChange?.(fileList);
    };

    const getBase64 = (file: any) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <div>
            <Upload
                listType='picture-card'
                fileList={value}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}>
                {value.length < 8 && (
                    <div>
                        <PlusOutlined />
                        <div className='ant-upload-text'>Upload</div>
                    </div>
                )}
            </Upload>
            <Modal open={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%', borderRadius: '5px' }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default ImageUpload;
