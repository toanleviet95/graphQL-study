import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Loading, Header, LaunchTile } from '../components';
import { GET_MY_TRIPS } from '../gqls/profile';

export default function Profile() {
  /*
    By default, Apollo Client's fetch policy is cache-first,
    which means it checks the cache to see if the result is there
    before making a network request.
    Since we want this list to always reflect the newest data from our graph API,
    we set the fetchPolicy for this query to network-only
  */
  const { data, loading, error } = useQuery(
    GET_MY_TRIPS,
    { fetchPolicy: "network-only" } // No cache-first
  );

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <>
      <Header>My Trips</Header>
      {data.me && data.me.trips.length ? (
        data.me.trips.map(launch => (
          <LaunchTile key={launch.id} launch={launch} />
        ))
      ) : (
        <p>You haven't booked any trips</p>
      )}
    </>
  );
}
