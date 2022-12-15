// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { CartContext } from '../../contexts (archived)/cart.context';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CartItems, EmptyMessage } from './card-dropdown.styles'

const CartDropdown = () => {
    // const { cartItems } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }

            </CartItems>
            <Button onClick={checkoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
};

export default CartDropdown;