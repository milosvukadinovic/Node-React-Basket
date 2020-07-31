import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout} from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from './Cart'
import Modal from 'react-bootstrap/Modal'

const CartContainer = ({ products, total, checkout, setTitle }) => (
  <Modal.Dialog>
    
  <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)} 
    setTitle ={setTitle} />
    </Modal.Dialog>
)

CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    sku: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)