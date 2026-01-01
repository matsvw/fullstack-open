import { useMemo, useCallback } from "react";
import { View, StyleSheet, Image, Button, FlatList } from "react-native";
import { openURL } from "expo-linking";
import theme from "../theme";
import Text from "./Text";
import ReviewItem from "./ReviewItem";
import { shortenNumber } from "../utils/formatter";

const CenteredDetailView = ({ label, value }) => {
  return (
    <View style={styles.colCenter}>
      <Text style={styles.boldText}>{shortenNumber(value)}</Text>
      <Text>{label}</Text>
    </View>
  );
};

const RepositoryInfo = ({ repository, fullView }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.row}>
        <View style={styles.colImage}>
          <Image
            source={{ uri: repository.ownerAvatarUrl }}
            style={styles.logo}
          />
        </View>
        <View style={styles.colMainDetails}>
          <Text style={styles.boldText}>{repository.fullName}</Text>
          <Text>{repository.description}</Text>
          <Text style={styles.codeLanguage}>
            {repository.language ?? "Unknown"}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <CenteredDetailView label="Forks" value={repository.stargazersCount} />
        <CenteredDetailView label="Stars" value={repository.forksCount} />
        <CenteredDetailView label="Reviews" value={repository.reviewCount} />
        <CenteredDetailView label="Ratings" value={repository.ratingAverage} />
      </View>
      {fullView && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Open in GitHub"
            onPress={() => openURL(repository.url)}
          />
        </View>
      )}
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryItem = ({ repository, fullView = false, onEndReach }) => {
  const reviewNodes = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  //console.log(reviewNodes);

  const header = useMemo(
    () => <RepositoryInfo repository={repository} fullView={fullView} />,
    [repository, fullView]
  );

  const renderItem = useCallback(
    ({ item }) => <ReviewItem review={item} />,
    []
  );

  return (
    <FlatList
      data={reviewNodes}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <ItemSeparator />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={header}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryItem;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    flexShrink: 1,
    resizeMode: "contain",
    borderRadius: theme.boxes.radius,
  },
  button: {
    fontFamily: theme.fonts.main,
    borderRadius: theme.boxes.radius,
  },
  buttonContainer: {
    marginBottom: 5,
  },
  boldText: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  subTitle: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  colMainDetails: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  colImage: {
    width: 60,
    paddingTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  codeLanguage: {
    flex: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: theme.boxes.radius,
    color: theme.colors.background,
    backgroundColor: theme.colors.primary,
  },
  colCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground,
  },
});
