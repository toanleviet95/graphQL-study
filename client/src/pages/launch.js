import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { Loading, Header, LaunchDetail } from '../components';
import { ActionButton } from '../containers';
import { GET_LAUNCH_DETAILS } from '../gqls/launch';

export default function Launch({ launchId }) {
  const { data, loading, error } = useQuery(
    GET_LAUNCH_DETAILS,
    { variables: { launchId } }
  );
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return (
    <>
      <Header image={data.launch.mission.missionPatch}>
        {data.launch.mission.name}
      </Header>
      <LaunchDetail {...data.launch} />
      <ActionButton {...data.launch} />
    </>
  );
}
