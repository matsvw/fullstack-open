import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import Text from './Text';

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

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
    <RepositoryListContainer repositories={repositories} />
  );
};


export default RepositoryList;
