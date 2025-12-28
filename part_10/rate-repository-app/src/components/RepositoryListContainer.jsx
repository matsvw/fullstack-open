import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const RepositoryListContainer = ({ repositories }) => {
  const nav = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const navToRepo = (id) => {
    nav(`/repositories/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <Pressable onPress={() => navToRepo(item.id)}>
          <RepositoryItem key={item.id} item={item} />
        </Pressable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryListContainer;
