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
	const [totalPages, setTotalPages] = useState(0);

	const handleImageResponse = ({ results, total_pages }) => {
		if (results.length === 0) {
			toast.error('Your query does not match results');
		}
		setImages(prevImages => [...prevImages, ...results]);
		setTotalPages(total_pages);
	};

	const fetchImages = async (searchQuery, currentPage) => {
		setIsLoading(true);
		try {
			const response = await unsplashApi.get('/', {
				params: {
					query: searchQuery,
					page: currentPage,
					client_id: ACCESS_KEY,
				},
			});
			handleImageResponse(response.data);
		} catch {
			toast.error('Failed to fetch images. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (query) {
			fetchImages(query, page);
		}
	}, [query, page]);

	const resetSearch = newQuery => {
		setQuery(newQuery);
		setPage(1);
		setImages([]);
		setTotalPages(0);
	};

	const handleSearchSubmit = searchQuery => {
		const trimmedQuery = searchQuery.trim();
		if (!trimmedQuery) {
			toast.error('Please enter a search term');
			return;
		}
		if (trimmedQuery === query && page === 1) {
			return;
		}
		resetSearch(trimmedQuery);
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
			{images.length > 0 && !isLoading && page < totalPages && (
				<LoadMoreBtn onClick={handleLoadMore} className={styles.loadMoreButton} />
			)}
			{selectedImage && <ImageModal imageUrl={selectedImage} onClose={closeModal} />}
		</div>
	);
};

export default App;
