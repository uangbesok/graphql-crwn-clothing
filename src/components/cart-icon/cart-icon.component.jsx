import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { useMutation, useQuery, gql } from '@apollo/client';

import './cart-icon.styles.scss';

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
      toggleCartHidden @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

const CartIcon = () => {

  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN);
  const { data: {itemCount} } = useQuery(GET_ITEM_COUNT);

  return (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>)
};

export default CartIcon;
