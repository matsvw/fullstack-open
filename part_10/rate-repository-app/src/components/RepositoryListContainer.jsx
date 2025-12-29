import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
}) => {
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
          <RepositoryItem key={item.id} repository={item} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
        <Picker
          selectedValue={selectedOrder}
          onValueChange={(itemValue, itemIndex) => setSelectedOrder(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Latest repositories" value="CD" />
          <Picker.Item label="Highest rated repositories" value="RD" />
          <Picker.Item label="Lowest rated repositories" value="RA" />
        </Picker>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground,
  },
  picker: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.greyBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryListContainer;
