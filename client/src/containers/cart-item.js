import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LaunchTile from '../components/launch-tile';
import { GET_LAUNCH } from '../gqls/launch';

export default function CartItem({ launchId }) {
  const { data, loading, error } = useQuery(
    GET_LAUNCH,
    { variables: { launchId } }
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR: {JSON.stringify(error)}</p>;
  return data && <LaunchTile launch={data.launch} />;
}
