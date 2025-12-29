import { useState } from "react";
import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router-native";
import { Searchbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import RepositoryItem from "./RepositoryItem";
import theme from "../theme";

const ListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchText,
  setSearchText,
  loading,
}) => {
  const debounced = useDebouncedCallback((value) => {
    setSearchText(value);
  }, 1000);

  return (
    <View style={styles.listHeader}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={debounced}
        defaultValue={searchText}
        loading={loading}
      />
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(itemValue, itemIndex) => setSelectedOrder(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Latest repositories" value="CD" />
        <Picker.Item label="Highest rated repositories" value="RD" />
        <Picker.Item label="Lowest rated repositories" value="RA" />
      </Picker>
    </View>
  );
};

const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
  searchText,
  setSearchText,
  loading,
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
        <ListHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          searchText={searchText}
          setSearchText={setSearchText}
          loading={loading}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground,
  },
  listHeader: {
    paddingHorizontal: 15,
    backgroundColor: theme.colors.greyBackground,
  },
  searchBar: {
    borderRadius: theme.boxes.radius,
    marginTop: 15,
    backgroundColor: theme.colors.background,
  },
  picker: {
    marginVertical: 20,
    border: "none",
    backgroundColor: theme.colors.greyBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryListContainer;
