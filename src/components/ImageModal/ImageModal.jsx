import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ imageUrl, onClose }) => {
	return (
		<Modal
			isOpen={!!imageUrl}
			onRequestClose={onClose}
			overlayClassName={styles.overlay}
			className={styles.content}
		>
			<div onClick={onClose} className={styles.imageContainer}>
				<img src={imageUrl} alt="Large preview" className={styles.image} />
			</div>
		</Modal>
	);
};

export default ImageModal;
