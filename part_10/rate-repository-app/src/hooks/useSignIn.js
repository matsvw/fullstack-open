import { useMutation, useApolloClient } from '@apollo/client/react';
import { LOGIN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN, { fetchPolicy: 'no-cache', });
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } })
    //console.log(data);
    const token = data?.authenticate?.accessToken;
    if (!token) {
      throw new Error("No access token returned!");
    }
    console.log(token);

    await authStorage.setAccessToken(token);
    await apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn