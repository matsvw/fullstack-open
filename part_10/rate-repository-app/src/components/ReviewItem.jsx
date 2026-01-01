import { View, StyleSheet, Button, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import useDeleteReview from "../hooks/useDeleteReview";
import theme from "../theme";
import Text from "./Text";

const CircleNumber = ({ value }) => (
  <View style={styles.circle}>
    <Text style={styles.circleText}>{value}</Text>
  </View>
);

const ReviewActions = ({ review }) => {
  const [deleteReview] = useDeleteReview();

  const checkDelete = (reviewId) => {
    showDeleteAlert(reviewId);
  };

  const deleteConfirmed = async (reviewId) => {
    try {
      await deleteReview({ id: reviewId });
    } catch (error) {
      //console.log(error.graphQLErrors)
      alert(error.message);
      console.log(error.message);
    }
  };

  const showDeleteAlert = (reviewId) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Delete canceled"), // do nothing
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteConfirmed(reviewId),
          style: "default",
        },
      ],
      {
        cancelable: true,
      }
    );

  const openRepo = (repositoryId) => {
    console.log("Open repo: ", repositoryId);
    nav(`/repositories/${repositoryId}`);
  };

  return (
    <View style={styles.row}>
      <View style={styles.buttonWrapper}>
        <Button
          title="View repository"
          onPress={() => openRepo(review.repositoryId)}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          color={theme.colors.error}
          title="Delete review"
          onPress={() => checkDelete(review.id)}
        />
      </View>
    </View>
  );
};

const ReviewItem = ({ review, showButtons = false }) => {
  const nav = useNavigate();

  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat("fi-FI").format(new Date(isoString));
  };

  return (
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
      {showButtons && <ReviewActions review={review} />}
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  boldText: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  subTitle: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  colMainDetails: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
