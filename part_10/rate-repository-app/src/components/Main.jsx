import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

const Main = () => {

  const toRepositoryList = () => {
    console.log("Nav to toRepositoryList")
  };

  // Must declare this after the onPress methods!
  const actions = [
    {
      onPress: toRepositoryList,
      label: "Repository"
    }
  ]

  console.log("Main rendering");

  return (
    <AppBar actions={actions} title="Repo Rating">
      <RepositoryList />
    </AppBar>
  );
};

export default Main;