import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        console.log('products load before fetch');
        fetch('products.json')
        .then(res=> res.json())
        .then(data => {
            setProducts(data);
            // console.log('products loaded');
        })
    }, []);

    useEffect(() => {
        console.log('Local storage first line', products);
        const storedCart = getStoredCart();
        const savedCart = [];
        // console.log(storedCart);
        // object er jonno for in mari 
        for(const id in storedCart){
            // console.log(id); //object theke shudhu id gula paisi
            const addedProduct = products.find(product => product.id === id)
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
                console.log(addedProduct);
            }
        }
        setCart(savedCart);
        // console.log('local storage finished');
        
    }, [products])

    const handleAddToCart = (product) =>{
        // console.log(product);
        // do not do this: cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
        // console.log(newCart);
    }
    

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;