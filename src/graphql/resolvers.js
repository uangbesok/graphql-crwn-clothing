import { gql } from '@apollo/client';

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
    }
`

const GET_CARD_HIDDEN = gql`
    {
        cartHidden @client
    }
`

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, variables, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CARD_HIDDEN
            });

            cache.writeQuery({
                query: GET_CARD_HIDDEN,
                data: { cartHidden: !cartHidden},
            })

            return !cartHidden;
        }
    }
}