import { useState, useEffect } from 'react'
import './App.css'
import { ProductCard } from './components/ProductCard/ProductCard.jsx'
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter.jsx'
import { DiscountToggle } from './components/DiscountToggle/DiscountToggle.jsx'
import { SearchBar } from './components/SearchBar/SearchBar.jsx'

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?delay=1000&limit=194&select=title,description,category,price,discountPercentage,thumbnail,rating')
      .then(res => res.json())
      .then(data => {
        // como todos los productos tienen descueto se decime al azar unos tengan o otrso no
        const newData = {
          ...data,
          products: data.products.map(product => ({
            ...product,
            discountPercentage: Math.random() < 0.5 ? 0 : product.discountPercentage
          }))
        };
        setData(newData);
        const uniqueCategories = [...new Set(newData.products.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <>
          <header>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <DiscountToggle
              showDiscounted={showDiscounted}
              onToggleDiscount={() => setShowDiscounted(!showDiscounted)}
            />
          </header>
          <div className="productsContainer">
            {data.products
              .filter(product => !selectedCategory || product.category === selectedCategory)
              .filter(product => !showDiscounted || product.discountPercentage > 0)
              .filter(product => !searchTerm || product.title.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App