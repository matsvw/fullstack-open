import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const Main = () => {

  const toRepositoryList = () => {
    console.log("Nav to toRepositoryList")
  };

  // Must declare this after the onPress methods!
  const actions = [
    {
      linkTo: '/repositories',
      label: "Repository"
    },
    {
      linkTo: '/signin',
      label: "Sign In"
    },
  ]

  console.log("Main rendering");

  return (
    <AppBar actions={actions}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </AppBar>
  );
};

export default Main;