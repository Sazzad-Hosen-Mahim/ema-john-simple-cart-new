import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getStoredCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState([]);

  const clearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  useEffect(() => {
    const storedCart = getStoredCart();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    // console.log(product);
    // do not do this: cart.push(product);

    let newCart = [];
    const exist = cart.find((product) => product.id === selectedProduct.id);
    //add btn e clk korar por jodi oi product ta cart er vetor na thake tobe notun kore add korar condition
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    }
    // add to cart button e click korar por ei condition check korbe. orthath jodi cart er selected product ta thake tobei quantity r man 1 barabe.
    else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id); //product id er shathe btn er clicked id match hoinai oitake rest er moddhe rakhlam
      exist.quantity = exist.quantity + 1; //jehetu ei product age theke chilo tai oitar value 1 barailam
      newCart = [...rest, exist]; //rest er moddhe agey theke rakhsi jeigula match khainai ebong er shathe quantity barano 'exist' jinish taw rakhlam
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
    // console.log(newCart);
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to="/orders">
            <button>Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
