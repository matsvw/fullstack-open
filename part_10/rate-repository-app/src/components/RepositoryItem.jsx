import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16
  }
});


const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text>ID: {item.id}</Text>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.forksCount}</Text>
      <Text>Forks: {item.stargazersCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Avatar url: {item.ownerAvatarUrl}</Text>
    </View>
  )
}

export default RepositoryItem