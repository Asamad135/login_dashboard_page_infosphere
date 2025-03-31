'use client'
import { useState, useEffect } from 'react';
import { Content } from '@carbon/react';
import SearchInput from '@/components/SearchInput';
import TextInput from '@/components/TextInput';
import Dropdown from '@/components/Dropdown';
import DataTable from '@/components/DataTable';
import deleteStyles from '@/styles/DeleteModule.module.scss';

export default function DeleteModule() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [notes, setNotes] = useState('');

  const headers = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'price', header: 'Price' },
    { key: 'category', header: 'Category' },
    { key: 'stock', header: 'Stock' }
  ];

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts([]);
    }
  }, [selectedCategory, products]);

  const handleSearch = (searchTerm) => {
    const filtered = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || product.category === selectedCategory)
    );
    setFilteredProducts(filtered);
  };

  return (
    <Content>
      <div className={deleteStyles.deleteContainer}>
        <h1 className={deleteStyles.title}>Delete Products</h1>
        
        <div className={deleteStyles.controlsSection}>
          <div className={deleteStyles.fullWidth}>
            <SearchInput onSearch={handleSearch} />
          </div>
          
          <TextInput
            labelText="Notes"
            placeholder="Enter any additional notes..."
            onChange={setNotes}
            value={notes}
            id="delete-notes"
          />
          
          <Dropdown 
            items={categories}
            onChange={setSelectedCategory}
            label="Select Category"
          />
        </div>

        {selectedCategory && (
          <div className={deleteStyles.tableSection}>
            <DataTable 
              data={filteredProducts.map(({ id, title, price, category, stock }) => ({
                id,
                title,
                price: `$${price}`,
                category,
                stock
              }))} 
              headers={headers}
            />
          </div>
        )}
      </div>
    </Content>
  );
}
