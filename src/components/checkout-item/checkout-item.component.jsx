import './checkout-item.style.scss'

import { useContext } from 'react';
import { CartContext } from '../../contexts (archived)/cart.context';

const CheckOutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { addItemToCart, removeItemToCart, removeItemFromCart } = useContext(CartContext);
    const clearHandler = () => removeItemFromCart(cartItem)
    const removeHandler = () => removeItemToCart(cartItem)
    const addHandler = () => addItemToCart(cartItem)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeHandler}>
                    &#10094;    
                </div>
                <span className='value'>{quantity}</span> 
                <div className='arrow' onClick={addHandler}>
                    &#10095;    
                </div>
            </span>
            <span className='price'>$ {price}</span>
            <div className='remove-button' onClick={clearHandler}>&#10005;</div>
        </div>
    )
}

export default CheckOutItem