import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '@/components/SearchBar';
import ImageGallery from '@/components/ImageGallery';
import Loader from '@/components/Loader';
import LoadMoreBtn from '@/components/LoadMoreBtn';
import ImageModal from '@/components/ImageModal';
import styles from '@/App.module.css';

const ACCESS_KEY = '0OYVNsKKdn0HjwHyy_2tQwfFBrfV2F3htpueSYpAooM';

const unsplashApi = axios.create({
	baseURL: 'https://api.unsplash.com/search/photos',
});

const App = () => {
	const [images, setImages] = useState([]);
	const [query, setQuery] = useState('');
	const [page, setPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		if (query) {
			const fetchImages = async () => {
				setIsLoading(true);
				try {
					const response = await unsplashApi.get('/', {
						params: {
							query,
							page,
							client_id: ACCESS_KEY,
						},
					});
					const newImages = response.data.results;
					if (!newImages.length) {
						toast.error('Your query does not match results');
					}
					setImages(prevImages => [...prevImages, ...newImages]);
				} catch {
					toast.error('Failed to fetch images. Please try again later.');
				} finally {
					setIsLoading(false);
				}
			};

			fetchImages();
		}
	}, [page, query]);

	const handleSearchSubmit = searchQuery => {
		const trimmedQuery = searchQuery.trim();
		if (trimmedQuery === '') {
			toast.error('Please enter a search term');
			return;
		}
		if (trimmedQuery === query && page === 1) {
			return;
		}
		setQuery(searchQuery);
		setPage(1);
		setImages([]);
	};

	const handleLoadMore = () => {
		setPage(prevPage => prevPage + 1);
	};

	const handleImageClick = imageUrl => {
		setSelectedImage(imageUrl);
	};

	const closeModal = () => {
		setSelectedImage(null);
	};

	return (
		<div className={styles.container}>
			<Toaster position="top-right" />
			<SearchBar onSubmit={handleSearchSubmit} />
			<ImageGallery images={images} onImageClick={handleImageClick} />
			{isLoading && <Loader />}
			{images.length > 0 && !isLoading && (
				<LoadMoreBtn onClick={handleLoadMore} className={styles.loadMoreButton} />
			)}
			{selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
		</div>
	);
};

export default App;
