import React from 'react';

import CustomButton from '../custom-button/custom-button.component';
import { gql, useMutation } from "@apollo/client";

import './collection-item.styles.scss';

const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, { variables: { item } });

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={addItemToCart} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
