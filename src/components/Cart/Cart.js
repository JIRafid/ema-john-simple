import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    //const totalPrice = cart.reduce((total, product) => total + product.price, 0);
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity;
        
    }

    let shippingCost = 0;
    if (totalPrice > 15){
        shippingCost = 4.99;
    }
    else if(totalPrice > 0){
        shippingCost = 12.99;
    }
    else if(totalPrice > 35){
        shippingCost = 0;
    }

    const tax = totalPrice / 10;
    

    const formatNum = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4 className='text-primary'>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Products Price: {formatNum(totalPrice)}</p>
            <p><small>Shipping Cost: {shippingCost}</small></p>
            <p><small>Tax + Vat: {formatNum(tax)}</small></p>
            <p>Total Price: {formatNum(totalPrice + shippingCost + tax)}</p>
            <br />
            {
                props.children
            }
        </div>

    );
};

export default Cart;