import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../components/button';
import { TOGGLE_CART } from '../gqls/cart';
import { GET_LAUNCH_DETAILS } from '../gqls/launch';
import { CANCEL_TRIP } from '../gqls/trip';

export default function ActionButton({ isBooked, id, isInCart }) {
  const [mutate, { loading, error }] = useMutation(
    isBooked ? CANCEL_TRIP : TOGGLE_CART,
    {
      variables: { launchId: id },
      refetchQueries: [
        {
          query: GET_LAUNCH_DETAILS,
          variables: { launchId: id },
        },
      ]
    }
  );

  if (error) return <p>ERROR: {JSON.stringify(error)}</p>;

  return (
    <div>
      <Button
        onClick={mutate}
        isBooked={isBooked}
        data-testid={'action-button'}
      >
        {loading ? 'Please wait...' : isBooked
          ? 'Cancel This Trip'
          : isInCart
          ? 'Remove from Cart'
          : 'Add to Cart'}
      </Button>
    </div>
  );
}
