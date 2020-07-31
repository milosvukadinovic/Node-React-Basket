import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from './ProductItem'
import ProductsList from './ProductsList'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'

const ProductsContainer = ({ products, addToCart }) => (
  <Modal.Dialog>
  <ProductsList title="Products">
    {products.map(product =>
    <Nav fill >

    
      <ProductItem
        key={product.sku}
        product={product}
        onAddToCartClicked={() => addToCart(product.sku)} />
        </Nav>
    )}
    
  </ProductsList>
  </Modal.Dialog>
)

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    sku: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  })).isRequired,
  addToCart: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
})

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductsContainer)