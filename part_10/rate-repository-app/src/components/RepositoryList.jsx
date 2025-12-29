import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryListContainer from "./RepositoryListContainer";
import Text from "./Text";

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState("CD");
  const { repositories, loading, error } = useRepositories(selectedOrder);
  console.log("Selected order: ", selectedOrder);

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
      repositories={repositories}
    />
  );
};

export default RepositoryList;
