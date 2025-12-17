import { View, StyleSheet, Image } from 'react-native';
import theme from '../theme'
import Text from './Text';

const CenteredDetailView = ({ label, value }) => {

  const shortenNumber = (value) => {
    if (typeof value === 'number') {
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`
      }
    }
    return value;
  }

  return (
    <View style={styles.colCenter}>
      <Text style={styles.boldText}>{shortenNumber(value)}</Text>
      <Text>{label}</Text>
    </View>
  )
}

const RepositoryItem = ({ item }) => {
  return (

    <View style={styles.container}>

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

    </View>
  )
}

export default RepositoryItem


const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 4
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
    flexDirection: 'row',
    marginBottom: 10,
  },
  colMainDetails: {
    flex: 1,
    stretch: 1,
    paddingLeft: 20,
    paddingBottom: 10,
    justifyContent: 'top',
    alignItems: 'flex-start',
  },
  colImage: {
    flex: 0,
    stretch: 1,
    paddingTop: 5,
    justifyContent: 'top',
    alignItems: 'center',
  },
  codeLanguage: {
    flex: 0,
    stretch: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 6,
    color: theme.colors.background,
    backgroundColor: theme.colors.primary,
  },
  colCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
