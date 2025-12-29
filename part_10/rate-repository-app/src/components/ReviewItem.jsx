import { View, StyleSheet, Button } from "react-native";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import Text from "./Text";

const CircleNumber = ({ value }) => (
  <View style={styles.circle}>
    <Text style={styles.circleText}>{value}</Text>
  </View>
);

const ReviewItem = ({ review, showButtons = false }) => {
  const nav = useNavigate();

  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat("fi-FI").format(new Date(isoString));
  };

  const openRepo = () => {
    console.log("Open repo: ", review.repositoryId);
    nav(`/repositories/${review.repositoryId}`);
  };

  const deleteReview = () => {
    console.log("Delete review");
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
      {showButtons && (
        <View style={styles.row}>
          <View style={styles.buttonWrapper}>
            <Button title="View repository" onPress={openRepo} />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              color={theme.colors.error}
              title="Delete review"
              onPress={deleteReview}
            />
          </View>
        </View>
      )}
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
