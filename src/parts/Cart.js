import React, { useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Nav from "react-bootstrap/Nav";
import { removeFromCart } from "../actions";
import { connect } from "react-redux";
import { getVisibleProducts } from "../reducers/products";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toNumber } from "lodash";
const axios = require("axios");

const Cart = ({
  products,
  total,
  onCheckoutClicked,
  removeFromCart,
  setTitle,
}) => {
  const [promoCode, setPromoCode] = useState({ n: 0 });
  const [page, setPage] = useState("cart");
  const [card, setCard] = useState('');
  const [code, setCode] = useState("");

  const hasProducts = products.length > 0;
  const nodes = hasProducts ? (
    products.map((product, index) => (
      <Nav fill key={index}>
        <ListGroup key={index} horizontal className="m-2">
          <Product
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            key={product.sku}
          />
          <Button
            onClick={() => removeFromCart(product.sku)}
            className="float-right"
          >
            Remove
          </Button>
        </ListGroup>
      </Nav>
    ))
  ) : (
    <div className="m-3 text-center"><em>Please add some products to cart.</em></div>
  );

  const callPromoCode = async () => {
    axios
      .post("/api/promocode", {
        promoCode: code,
      })
      .then(function (response) {
        setPromoCode({
          perc: response.data.discounttype,
          n: response.data.amount,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const callCheckOut = () => {
    let data = [];
    products.forEach((element) => {
      data.push({ sku: element.sku, amount: element.amount });
    });

    axios
      .post("/api/checkout", {
        basket: data,
        cardNumber: `${card}`,
      })
      .then(function (response) {
        if (response.data.errors) {
          console.log(error);
          setTitle("Failed Checkout");
          setPage("err");
        } else {
          setTitle("Successful Checkout");
          setPage("suc");
        }
      })
      .catch(function (error) {
        console.log(error);
        setTitle("Failed Checkout");
        setPage("err");
      });
  };

  if (page == "cart") {
    return (
      <div>
        <div>{nodes}</div>
        <div>
          <Form className="mt-5 ml-2 mr-2 text-center">
            <Form.Row>
              <Col xs="auto">
                <Form.Label>Enter promo code</Form.Label>
              </Col>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder=""
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button className="mb-2" onClick={() => callPromoCode()}>
                  Apply code
                </Button>
              </Col>
            </Form.Row>
          </Form>{" "}
        </div>

        <p className="m-3 p3 text-center">Subtotal: &#36;{total}</p>
        <p className="m-3 p3 text-center">
          Promo Code Discount: {promoCode.n}%
        </p>
        <span></span>
        <p className="m-3 p3 text-center">
          Basket Total: &#36;
          {(
            Number(total) -
            (Number(promoCode.n) / 100) * Number(total)
          ).toFixed(2)}
        </p>
        <Form className="mt-5 ml-2 mr-2 text-center">
          <Col xs="auto">
            <Form.Label>Enter credit card</Form.Label>
          </Col>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder=""
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
          </Col>
        </Form>
        <div className="text-center">
          <Button
            className="m-4"
            onClick={() => callCheckOut()}
            disabled={hasProducts ? "" : "disabled"}
          >
            Checkout
          </Button>
        </div>
      </div>
    );
  } else if (page == "err") {
    return (
      <div className="m-5">
        Sorry, there was a problem with your order. Contact our support.
      </div>
    );
  } else {
    return <div className="m-5">Thank you, your order is being processed.</div>;
  }
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func,
  removeFromCart: PropTypes.func,
};

const mapStateToProps = (state) => ({
  productsList: getVisibleProducts(state.products),
});

export default connect(mapStateToProps, { removeFromCart })(Cart);
