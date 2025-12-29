import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";
import ReviewItem from "./ReviewItem";

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewListContainer = ({ reviews }) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} showButtons={true} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ReviewListContainer;

const styles = StyleSheet.create({
  separator: {
    height: 10,
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
