import { useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (id) => {
  const variables = { id, first: 4 };
  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = useCallback(() => {
    const pageInfo = data?.repository?.reviews.pageInfo;
    const canFetchMore = !loading && pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log("Fetch more: ", pageInfo.endCursor);

    fetchMore({
      variables: {
        ...variables,
        after: pageInfo.endCursor,
      },
    });
  }, [loading, data, fetchMore, variables]);

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    error,
  };
};

export default useRepository;
