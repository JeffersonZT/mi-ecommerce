import './ProductCard.css'

export const ProductCard = ({ product }) => {
    const totalPrice = product.price - (product.price * product.discountPercentage / 100)
    const rating = Number(product.rating ?? 4.2)
    const fullStars = Math.floor(rating)
    const hasHalf = rating - fullStars >= 0.5

    const stars = []
    for (let i = 1; i <= 5; i += 1) {
        if (i <= fullStars) stars.push('★')
        else if (i === fullStars + 1 && hasHalf) stars.push('★')
        else stars.push('☆')
    }

    return (
        <div className='productCard'>
            <figure className='productImage'>
                <img src={product.thumbnail} alt={product.title} />
                <div className='discount'>-{product.discountPercentage.toFixed(0)}%</div>
            </figure>

            <h2>{product.title}</h2>
            <div className='category'>{product.category}</div>
            <div className='rating' aria-label={`rating ${rating} sobre 5`}>
                <span>{stars.join(' ')}</span>
                <span className='ratingValue'>{rating.toFixed(1)}</span>
            </div>

            <div className='description'>
                <p>{product.description}</p>
            </div>

            <div className='priceBlock'>
                <p className='price'>${product.price.toFixed(2)}</p>
                <p className='total'>${totalPrice.toFixed(2)}</p>
            </div>
        </div>
    )
}
