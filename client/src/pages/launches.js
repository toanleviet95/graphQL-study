import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { LaunchTile, Header, Button, Loading } from "../components";
import { GET_LAUNCHES } from '../gqls/launches'

export default function Launches() {
  const { data, loading, error, fetchMore } = useQuery(GET_LAUNCHES);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;

  return (
    <>
      <Header />
      {data.launches &&
        data.launches.launches &&
        data.launches.launches.map(launch => (
          <LaunchTile
            key={launch.id}
            launch={launch}
          />
      ))}

      {data.launches && data.launches.hasMore && (
        <Button
          onClick={() => {
            setIsFetchingMore(true);
            fetchMore({
              variables: {
                after: data.launches.cursor
              },
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                setIsFetchingMore(false);
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  launches: {
                    ...fetchMoreResult.launches,
                    launches: [
                      ...prev.launches.launches,
                      ...fetchMoreResult.launches.launches
                    ]
                  }
                };
              }
            })
          }
          }
        >
          {isFetchingMore ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  );
}
