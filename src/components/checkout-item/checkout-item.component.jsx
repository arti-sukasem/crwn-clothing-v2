import './checkout-item.style.scss'

// import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import { CartContext } from '../../contexts (archived)/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, removeItemToCart } from '../../store/cart/cart.action';

const CheckOutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems)
    const { name, imageUrl, price, quantity } = cartItem;
    const addHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const clearHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const removeHandler = () => dispatch(removeItemToCart(cartItems, cartItem)) ;

    // const { addItemToCart, removeItemToCart, removeItemFromCart } = useContext(CartContext);
    // const clearHandler = () => removeItemFromCart(cartItem)
    // const removeHandler = () => removeItemToCart(cartItem)
    // const addHandler = () => addItemToCart(cartItem)

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