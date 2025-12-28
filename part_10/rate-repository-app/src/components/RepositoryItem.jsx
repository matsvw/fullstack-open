import { View, StyleSheet, Image, Button } from "react-native";
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

const RepositoryItem = ({ item, fullView = false }) => {
  //const linking = useLinkingURL();

  //console.log("Reposiory item: ", item);
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.row}>
        <View style={styles.colImage}>
          <Image source={{ uri: item.ownerAvatarUrl }} style={styles.logo} />
        </View>
        <View style={styles.colMainDetails}>
          <Text style={styles.boldText}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.codeLanguage}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <CenteredDetailView label="Forks" value={item.stargazersCount} />
        <CenteredDetailView label="Stars" value={item.forksCount} />
        <CenteredDetailView label="Reviews" value={item.reviewCount} />
        <CenteredDetailView label="Ratings" value={item.ratingAverage} />
      </View>
      {fullView && (
        <View>
          <Button
            style={styles.button}
            title="Open in GitHub"
            onPress={() => openURL(item.url)}
          />
        </View>
      )}
    </View>
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
  boldText: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
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
});
