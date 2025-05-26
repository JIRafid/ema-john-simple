import React from 'react';
import Button from 'react-bootstrap/Button';

const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    const style = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    };

    return (
        <div style={style} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <Button variant="warning" onClick={() => props.removeProduct(key)}>Remove</Button>
        </div>
    );
};

export default ReviewItem;