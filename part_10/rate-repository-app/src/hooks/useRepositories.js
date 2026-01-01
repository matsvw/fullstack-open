import { useMemo, useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ORDERED_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order, searchText) => {
  const ordering = [
    { key: "CD", orderBy: "CREATED_AT", orderDirection: "DESC" },
    { key: "RD", orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    { key: "RA", orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  ];

  console.log("Selected order: ", order);
  console.log("Search text: ", searchText);

  const orderVariables = ordering.find((o) => o.key === order);
  if (!orderVariables) {
    throw new Error(`Ordering key '${order} not supported'`);
  }

  const variables = useMemo(
    () => ({
      orderDirection: orderVariables.orderDirection,
      orderBy: orderVariables.orderBy,
      searchKeyword: searchText,
      first: 4,
    }),
    [orderVariables, searchText]
  );

  const { data, error, loading, fetchMore } = useQuery(
    GET_ORDERED_REPOSITORIES,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = useCallback(() => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    console.log("Fetch more: ", data.repositories.pageInfo.endCursor);

    fetchMore({
      variables: {
        ...variables,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  }, [loading, data, fetchMore, variables]);

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
  };
};

export default useRepositories;
