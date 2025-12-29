import { useQuery } from "@apollo/client/react";
import { GET_ORDERED_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order) => {
  const ordering = [
    { key: "CD", orderBy: "CREATED_AT", orderDirection: "DESC" },
    { key: "RD", orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
    { key: "RA", orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  ];

  const variables = ordering.find((o) => o.key === order);
  if (!variables) {
    throw new Error(`Ordering key '${order} not supported'`);
  }

  const { data, error, loading } = useQuery(GET_ORDERED_REPOSITORIES, {
    variables: {
      orderDirection: variables.orderDirection,
      orderBy: variables.orderBy,
    },
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data?.repositories, loading, error };
};

export default useRepositories;
