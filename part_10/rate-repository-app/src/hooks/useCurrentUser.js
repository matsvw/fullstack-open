import { useQuery } from "@apollo/client/react";
import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (includeReviews = true) => {
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });
  return { user: data?.me, loading, error };
};

export default useCurrentUser;
