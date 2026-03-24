import { useState, useEffect } from 'react'
import { ProductCard } from './components/ProductCard/ProductCard.jsx'
import './App.css'
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter.jsx'

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="productsContainer">
            {data.products
              .filter(product => !selectedCategory || product.category === selectedCategory)
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