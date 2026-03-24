import './SearchBar.css'

export const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className='searchBar'>
        <input
          type='text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        {/* <button onClick={() => onSearch(searchTerm)}>Search</button> */}
    </div>
  )
}
