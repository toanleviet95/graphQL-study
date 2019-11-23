const { gql } = require("apollo-server");

const typeDefs = gql`
  # Your schema
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    # missionPatch(size: PatchSize): String
    missionPatch(mission: String, size: PatchSize): String
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    # launches: [Launch]!

    # Paginated queries
    launches(
      """
        The number of results to show. Must be >= 1. Default = 20
      """
      pageSize: Int,
      """
        If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!

    launch(id: ID!): Launch

    # Queries for the current user
    me: User
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(lauchId: ID!): TripUpdateResponse!
    login(email: String): String
  }
`;

module.exports = typeDefs;
