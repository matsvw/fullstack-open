import { View, Text, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});


const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text styles={styles.text}>ID: {item.id}</Text>
      <Text styles={styles.text}>Full name: {item.fullName}</Text>
      <Text styles={styles.text}>Deescription: {item.description}</Text>
      <Text styles={styles.text}>Language: {item.language}</Text>
      <Text styles={styles.text}>Stars: {item.forksCount}</Text>
      <Text styles={styles.text}>Forks: {item.stargazersCount}</Text>
      <Text styles={styles.text}>Rating: {item.ratingAverage}</Text>
      <Text styles={styles.text}>Reviews: {item.reviewCount}</Text>
      <Text styles={styles.text}>Avatar url: {item.ownerAvatarUrl}</Text>
    </View>
  )
}

export default RepositoryItem