import gql from 'graphql-tag';

export const typeDefs = gql`
  type Brewery {
    id: ID!
    name: String!
    breweryType: String
    street: String
    city: String
    state: String
    postalCode: String
    country: String
    phone: String
    websiteUrl: String
    latitude: Float
    longitude: Float
  }

  type BreweryConnection {
    items: [Brewery!]!
    total: Int!
    page: Int!
    perPage: Int!
  }

  type Query {
    breweries(
      page: Int
      perPage: Int
      byCity: String
      byState: String
      byType: String
      byName: String
      sort: String
    ): BreweryConnection!

    brewery(id: ID!): Brewery

    searchBreweries(
      query: String!
      page: Int
      perPage: Int
    ): BreweryConnection!

    randomBreweries(size: Int): [Brewery!]!
  }
`;
