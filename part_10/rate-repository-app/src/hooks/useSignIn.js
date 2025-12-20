import { useMutation } from '@apollo/client/react';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN, { fetchPolicy: 'no-cache', });

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { username, password } })
    return result.data;
  };

  return [signIn, result];
};

export default useSignIn