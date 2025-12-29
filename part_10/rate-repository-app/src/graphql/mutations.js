import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
      createdAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      userId
      repositoryId
      createdAt
    }
  }
`;
