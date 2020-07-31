import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import Nav from './Nav'

const App = () => (
  
  <div>
    <Nav></Nav>
    <CartContainer />
    <ProductsContainer />
    <hr/>
  </div>
)

export default App