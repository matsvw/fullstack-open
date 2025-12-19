import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

import theme from '../theme'
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.greyBackground
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  //console.log(repositoryNodes);

  if (loading) {
    return (
      <Text>Loading data...</Text>
    )
  }

  if (error) {
    console.log(error);
    return (
      <Text>There was an error loading data</Text>
    )
  }

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


export default RepositoryList;
