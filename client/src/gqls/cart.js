import gql from "graphql-tag";

/*
Querying local data from the Apollo cache is almost the same as querying remote data from a graph API.
The only difference is that you add a @client directive to a local field
to tell Apollo Client to pull it from the cache
*/

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems @client
  }
`;

export const TOGGLE_CART = gql`
  mutation addOrRemoveFromCart($launchId: ID!) {
    addOrRemoveFromCart(id: $launchId) @client {
      id
      isBooked
      rocket {
        id
        name
      }
      mission {
        name
        missionPatch
      }
    }
  }
`;
