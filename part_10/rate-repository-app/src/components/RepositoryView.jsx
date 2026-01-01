import { useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, error, fetchMore } = useRepository(id);

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
    <RepositoryItem
      repository={repository}
      fullView={true}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryView;
