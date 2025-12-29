import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import Text from "./Text";

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("CD");
  const [searchText, setSearchText] = useState("");
  const { repositories, loading, error } = useRepositories(
    selectedOrder,
    searchText
  );

  if (loading) {
    return <Text>Loading data...</Text>;
  }

  if (error) {
    console.log(error);
    return <Text>There was an error loading data</Text>;
  }

  return (
    <RepositoryListContainer
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchText={searchText}
      setSearchText={setSearchText}
      repositories={repositories}
      loading={loading}
    />
  );
};

export default RepositoryList;
