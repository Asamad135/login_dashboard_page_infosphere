'use client'
import { Search, Button } from '@carbon/react';
import styles from './SearchInput.module.scss';

export default function SearchInput({ onSearch }) {
  const handleSearch = (e) => {
    if (e.type === 'click' || (e.key === 'Enter' && e.target.value)) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <Search
        size="lg"
        placeholder="Search..."
        labelText="Search"
        onKeyPress={handleSearch}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
