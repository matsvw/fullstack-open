import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import Text from "./Text";

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("CD");
  const [searchText, setSearchText] = useState("");
  const { repositories, loading, error, fetchMore } = useRepositories(
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

  const onEndReach = () => {
    //console.log("You have reached the end of the list");
    fetchMore();
  };

  return (
    <RepositoryListContainer
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchText={searchText}
      setSearchText={setSearchText}
      repositories={repositories}
      loading={loading}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
