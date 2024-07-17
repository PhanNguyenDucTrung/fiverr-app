// VideoModal.js
import React from 'react';
import Modal from 'react-modal';

type VideoModalProps = {
    isOpen: boolean;
    onRequestClose: () => void;
    videoUrl: string;
};

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onRequestClose, videoUrl }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0',
                    margin: '0',
                    width: '100%',
                    maxWidth: '900px',
                    height: '455px',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    zIndex: 9999,
                },
                overlay: {
                    zIndex: 9999,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
            }}>
            <video
                width='100%'
                style={{
                    margin: '0',
                    padding: '0',
                    height: '100%',
                    objectFit: 'cover',
                }}
                autoPlay
                controls>
                <source src={videoUrl} type='video/mp4' />
            </video>
        </Modal>
    );
};

export default VideoModal;
