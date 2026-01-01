import { useMemo, useCallback, useState, useEffect } from "react";
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
  onEndReach,
  selectedOrder,
  setSelectedOrder,
  searchText,
  setSearchText,
  loading,
}) => {
  const nav = useNavigate();
  const [accumulatedNodes, setAccumulatedNodes] = useState([]);

  useEffect(() => {
    const newNodes = repositories?.edges.map((e) => e.node) ?? [];

    setAccumulatedNodes((prev) => {
      const existingIds = new Set(prev.map((n) => n.id));
      const uniqueNewNodes = newNodes.filter(
        (node) => !existingIds.has(node.id)
      );

      // If this looks like a fresh fetch (fewer items than before), replace
      if (newNodes.length < prev.length) {
        return newNodes;
      }

      return [...prev, ...uniqueNewNodes];
    });
  }, [repositories]);

  // Reset when search/order changes
  useEffect(() => {
    setAccumulatedNodes(repositories?.edges.map((e) => e.node) ?? []);
  }, [selectedOrder, searchText]);

  const header = useMemo(
    () => (
      <ListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchText={searchText}
        setSearchText={setSearchText}
        loading={loading}
      />
    ),
    [selectedOrder, searchText, loading]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable onPress={() => nav(`/repositories/${item.id}`)}>
        <RepositoryItem repository={item} />
      </Pressable>
    ),
    [nav]
  );

  const handleEndReach = useCallback(() => {
    onEndReach();
  }, [onEndReach]);

  return (
    <FlatList
      data={accumulatedNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={header}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
      removeClippedSubviews={false}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
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
