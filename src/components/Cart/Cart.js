import React from "react";
import "./Cart.css";

const Cart = (props) => {
  const { cart, clearCart, children } = props;
  // console.log(cart);
  let total = 0;
  let shipping = 0;
  let quantity = 0;

  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
    shipping = shipping + product.shipping;
  }
  const tax = total * 0.1;
  const taxFixed = tax.toFixed(2);
  // console.log(product);

  const grandTotal = total + shipping + parseFloat(taxFixed);

  return (
    <div className="cart">
      <h4>Order Summary in Cart</h4>
      <p>Selected Items: {quantity}</p>
      <p>Total Price: ${total}</p>
      <p>Total Shipping: ${shipping}</p>
      <p>Tax: ${taxFixed}</p>
      <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
      <button onClick={clearCart}>CLear Cart</button>
      <br />
      {children}
    </div>
  );
};

export default Cart;
