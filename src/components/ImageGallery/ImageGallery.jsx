import ImageCard from './ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
	return (
		<ul className={styles.gallery}>
			{images.map(image => (
				<ImageCard
					key={image.id}
					src={image.urls.small}
					alt={image.alt_description}
					onClick={() => onImageClick(image.urls.regular)}
				/>
			))}
		</ul>
	);
};

export default ImageGallery;
