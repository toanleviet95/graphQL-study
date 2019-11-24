import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import Button from '../components/button';
import { GET_LAUNCH } from '../gqls/launch';
import { BOOK_TRIPS } from '../gqls/trip';

export default function BookTrips({ cartItems }) {
  const [bookTrips, { data, loading, error }] = useMutation(
    BOOK_TRIPS,
    {
      variables: { launchIds: cartItems },
      refetchQueries: cartItems.map(launchId => ({
        query: GET_LAUNCH,
        variables: { launchId },
      })),
      update(cache) {
        cache.writeData({ data: { cartItems: [] } });
      }
    }
  );

  if (loading) return <p>Booking...</p>;
  if (error) return <p>ERROR: {JSON.stringify(error)}</p>;

  return data && data.bookTrips && !data.bookTrips.success
    ? <p data-testid="message">{data.bookTrips.message}</p>
    : (
      <Button onClick={bookTrips} data-testid="book-button">
        Book All
      </Button>
    );
}
