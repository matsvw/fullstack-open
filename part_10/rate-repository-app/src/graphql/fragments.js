import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    id
    fullName
    description
    language
    ownerAvatarUrl
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review {
    id
    text
    rating
    createdAt
    repositoryId
    user {
      id
      username
    }
  }
`;

export const REPOSITORY_REVIEW_DETAILS = gql`
  fragment RepositoryReviewDetails on Repository {
    reviews {
      edges {
        node {
          ...ReviewDetails
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;
