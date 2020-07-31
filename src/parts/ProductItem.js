import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from 'react-bootstrap/Button'
import ListGroup from "react-bootstrap/ListGroup";

const ProductItem = ({ product, onAddToCartClicked }) => (
  <ListGroup horizontal>
    <Product
      name={product.name}
      price={product.price} />
    <Button inline
      onClick={onAddToCartClicked}>
      {'Add to cart'}
    </Button>
    </ListGroup>
)

ProductItem.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem