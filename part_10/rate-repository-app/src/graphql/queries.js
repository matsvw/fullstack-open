import { gql } from "@apollo/client";

import {
  REPOSITORY_DETAILS,
  REPOSITORY_REVIEW_DETAILS,
  REVIEW_DETAILS,
} from "./fragments";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_ORDERED_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $after: String, $first: Int) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews(after: $after, first: $first) {
        ...RepositoryReviewDetails
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REPOSITORY_REVIEW_DETAILS}
`;

export const GET_ME = gql`
  query {
    me {
      username
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;
