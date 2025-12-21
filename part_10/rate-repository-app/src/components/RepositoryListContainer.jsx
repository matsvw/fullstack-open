import { View, FlatList, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme'

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, index, separators }) => (
        <RepositoryItem key={item.id} item={item} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export default RepositoryListContainer;