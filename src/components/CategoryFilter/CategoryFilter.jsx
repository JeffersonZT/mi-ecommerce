import './CategoryFilter.css'

export const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className='categoryFilter'>
            <label htmlFor='categorySelect'>Filter by category:</label>
            <select
                id='categorySelect'
                value={selectedCategory}
                onChange={e => onSelectCategory(e.target.value)}
            >
                <option value=''>All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    )
}
