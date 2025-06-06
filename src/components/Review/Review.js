import React, { useEffect, useState } from 'react';
import { clearLocalShoppingCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import giphy from '../../images/giphy.gif'
import { useNavigate } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const navigate = useNavigate();

    const handleProceedCheckout = () => {
        navigate('/shipment')
    }
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key]; 
            return product;
        });
        setCart(cartProducts);
    }, [])
    
    let thankyou;
    if(orderPlaced) {
        thankyou = <img src={giphy} alt="" />
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem 
                        key = {pd.key} 
                        removeProduct = {removeProduct}
                        product = {pd}
                        ></ReviewItem>)
                }
                {
                   thankyou 
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='main-btn'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;