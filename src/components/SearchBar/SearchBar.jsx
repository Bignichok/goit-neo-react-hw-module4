import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
	const [input, setInput] = useState('');

	const handleInputChange = event => {
		setInput(event.target.value);
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		onSubmit(input);
	};

	return (
		<header className={styles.header}>
			<form onSubmit={handleFormSubmit} className={styles.form}>
				<input
					type="text"
					value={input}
					onChange={handleInputChange}
					placeholder="Search images and photos"
					autoComplete="off"
					autoFocus
					className={styles.input}
				/>
				<button type="submit" className={styles.button}>
					Search
				</button>
			</form>
		</header>
	);
};

export default SearchBar;
