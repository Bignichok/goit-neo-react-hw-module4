import styles from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => {
	return (
		<li className={styles.galleryItem}>
			<img onClick={onClick} src={src} alt={alt} className={styles.image} />
		</li>
	);
};

export default ImageCard;
