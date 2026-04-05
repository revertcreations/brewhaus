import gql from 'graphql-tag';

export const GET_BREWERY_BY_ID = gql`
  query GetBreweryById($id: ID!) {
    brewery(id: $id) {
      id
      name
      breweryType
      street
      city
      state
      postalCode
      country
      longitude
      latitude
      phone
      websiteUrl
    }
  }
`;

export const GET_BREWERIES = gql`
  query GetBreweries($perPage: Int, $page: Int) {
    breweries(perPage: $perPage, page: $page){
      items {
        id
        name
        city
        state
        websiteUrl
      }
      total
    }
  }
`;

export const SEARCH_BREWERIES = gql`
  query SearchBreweries($searchTerm: String!, $perPage: Int, $page: Int) {
    searchBreweries(query: $searchTerm, perPage: $perPage, page: $page) {
      items {
        id
        name
        city
        state
        websiteUrl
      }
      total
    }
  }
`;
