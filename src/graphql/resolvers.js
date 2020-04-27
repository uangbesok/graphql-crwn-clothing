import { gql } from '@apollo/client';
import { addItemToCart as addItemToCartUtils, getCartItemCount} from './cart.utils';

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`

const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args ,{ cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden},
            })

            return !cartHidden;
        },
        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const updatedCartItems = addItemToCartUtils(cartItems, item);

            const itemCount = getCartItemCount(updatedCartItems);

            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: { itemCount },
            })

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: updatedCartItems},
            })

            return updatedCartItems;
        }
    }
}