import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import Checkout from '../../routes/checkout/checkout.component';
import './card-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                }
            </div>
            <Button onClick={checkoutHandler}>Checkout</Button>
        </div>
    )
};

export default CartDropdown;