import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { CartContext } from '../../contexts (archived)/cart.context';
import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import {
  CartIconContainer,
  ShoppingIconContainer,
  ItemCount,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
  const dispatch = useDispatch();
  // const { isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIconContainer />
      <ItemCount as="span"> {cartCount} </ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
