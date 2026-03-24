import './DiscountToggle.css'

export const DiscountToggle = ({ showDiscounted, onToggleDiscount }) => {
  return (
    <div className='discountToggle'>
        <label htmlFor='discountCheckbox'>Show only discounted products</label>
        <input
          type='checkbox'
          id='discountCheckbox'
          checked={showDiscounted}
          onChange={onToggleDiscount}
        />
    </div>
  )
}
