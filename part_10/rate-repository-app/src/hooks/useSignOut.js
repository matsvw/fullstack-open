import { useApolloClient } from '@apollo/client/react';
import useAuthStorage from './useAuthStorage';
import { GET_ME } from '../graphql/queries';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    //await apolloClient.resetStore(); // resetStore causes abort, so using clearStore + refetchQueries instead
    await apolloClient.clearStore();
    await apolloClient.refetchQueries({
      include: [GET_ME],
    })
  };

  return [signOut];
};

export default useSignOut
