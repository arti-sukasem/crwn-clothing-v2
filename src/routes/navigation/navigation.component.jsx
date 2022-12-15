import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/card-dropdown/card-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
// import { CartContext } from '../../contexts (archived)/cart.context';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.styles';

const Navigation = () => {
  // const { currentUser } = useContext(UserContext)
  const currentUser =  useSelector(selectCurrentUser);
  // const { isCartOpen } = useContext(CartContext)
  const isCartOpen = useSelector(selectIsCartOpen)


  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser 
            ? (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>)
            : (<NavLink to='/authentication'> SIGN IN </NavLink>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
