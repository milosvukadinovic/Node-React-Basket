import React from 'react'
import PropTypes from 'prop-types'
import '../style.css'

const Product = ({ price, quantity, name }) => (
  <div  className="inline-product float-left">
    <span>{name} - &#36;{price}</span><span className="ml-5">{quantity ? `x ${quantity}` : null}</span>
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  name: PropTypes.string
}

export default Product