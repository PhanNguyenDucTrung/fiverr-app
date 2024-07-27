import React from 'react';
import { Skeleton } from 'antd';

const LoadingSkeleton: React.FC = () => (
    <>
        {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className='job-item'>
                <div className='job-item__image'>
                    <Skeleton.Image active />
                </div>
                <div className='job-item__body'>
                    <div className='seller-info'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Skeleton.Avatar active size={50} shape='circle' style={{ marginTop: 10 }} />
                            <Skeleton.Input active style={{ marginTop: 10, marginLeft: 10 }} />
                        </div>
                    </div>
                    <div className='job-item__content'>
                        <Skeleton.Input active style={{ width: '100%', marginTop: 10 }} />
                        <Skeleton.Input active style={{ width: '100%', marginTop: 10 }} />
                    </div>
                </div>
            </div>
        ))}
    </>
);

export default LoadingSkeleton;
