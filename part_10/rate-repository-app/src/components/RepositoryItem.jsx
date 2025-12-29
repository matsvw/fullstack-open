import { View, StyleSheet, Image, Button, FlatList } from "react-native";
import { openURL } from "expo-linking";
import theme from "../theme";
import Text from "./Text";
import { shortenNumber } from "../utils/formatter";

const CenteredDetailView = ({ label, value }) => {
  return (
    <View style={styles.colCenter}>
      <Text style={styles.boldText}>{shortenNumber(value)}</Text>
      <Text>{label}</Text>
    </View>
  );
};

const CircleNumber = ({ value }) => (
  <View style={styles.circle}>
    <Text style={styles.circleText}>{value}</Text>
  </View>
);

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
          <Text style={styles.codeLanguage}>{repository.language}</Text>
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

const ReviewItem = ({ review }) => {
  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat("fi-FI").format(new Date(isoString));
  };

  return (
    <View>
      <View style={styles.separator} />
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.colImage}>
            <CircleNumber value={review.rating} />
          </View>
          <View style={styles.colMainDetails}>
            <Text style={styles.boldText}>{review.user.username}</Text>
            <Text style={styles.subTitle}>{formatDate(review.createdAt)}</Text>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const RepositoryItem = ({ repository, fullView = false }) => {
  const reviewNodes = repository?.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  //console.log(reviewNodes);

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} fullView={fullView} />
      )}
    />
  );
};

export default RepositoryItem;

const ItemSeparator = () => <View style={styles.separator} />;

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
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
});
