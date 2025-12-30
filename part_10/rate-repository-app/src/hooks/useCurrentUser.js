import { useQuery } from "@apollo/client/react";
import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (includeReviews = true) => {
  const { data, error, loading, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: "cache-and-network",
  });

  const refreshUser = async () => {
    return refetch({ includeReviews });
  };

  return {
    user: data?.me,
    loading,
    error,
    refreshUser,
  };
};

export default useCurrentUser;
