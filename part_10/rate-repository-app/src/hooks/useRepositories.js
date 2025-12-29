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

  const variables = ordering.find((o) => o.key === order);
  if (!variables) {
    throw new Error(`Ordering key '${order} not supported'`);
  }

  const { data, error, loading } = useQuery(GET_ORDERED_REPOSITORIES, {
    variables: {
      orderDirection: variables.orderDirection,
      orderBy: variables.orderBy,
      searchKeyword: searchText,
    },
    fetchPolicy: "cache-and-network",
  });

  return { repositories: data?.repositories, loading, error };
};

export default useRepositories;
