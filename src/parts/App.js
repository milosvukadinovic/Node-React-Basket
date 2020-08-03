import React, { useState } from "react";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import Nav from "./Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTotal, getCartProducts } from "../reducers";
import { getQuantity } from "../reducers/cart";

const App = ({ total }) => {
  const [page, setPage] = useState("home");
  const [title, setTitle] = useState("Product List view");
  const changeTitle = () => {
    setTitle("Basket / Checkout view");
    setPage("cart");
  };
  if (page == "home") {
    return (
      <div>
        <Nav title={title}></Nav>
        <div className="float-right mr-3 mt-3">
          <Button onClick={() => changeTitle()}>Basket</Button>
          {` ${(total || 0)} Item/s`}
        </div>
        <ProductsContainer />
        <hr />
      </div>
    );
  } else {
    return (
      <div>
        <Nav title={title}></Nav>
        <div className=" mr-3 mt-3">
          {title == "Basket / Checkout view" && (
            <Button onClick={() => setPage("home")}>Continue shopping</Button>
          )}
        </div>
        <CartContainer setTitle={setTitle} />
        <hr />
      </div>
    );
  }
};
const mapStateToProps = (state) => {
  let result = getCartProducts(state);
  let quantity = 0;
  result.map((product) => {
    quantity = product.quantity + quantity;
  });
  return {
    total: quantity,
  };
};

export default connect(mapStateToProps)(App);
