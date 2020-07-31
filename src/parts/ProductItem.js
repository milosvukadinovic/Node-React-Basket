import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'
import Button from 'react-bootstrap/Button'
import ListGroup from "react-bootstrap/ListGroup";
import '../style.css'

const ProductItem = ({ product, onAddToCartClicked }) => (
  <ListGroup horizontal className="m-2">
    <Product 
      name={product.name}
      price={product.price} />
    <Button className="float-right"
      onClick={onAddToCartClicked}>
      {'Add to basket'}
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