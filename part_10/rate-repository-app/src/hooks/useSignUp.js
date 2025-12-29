import { useMutation } from "@apollo/client/react";
import { SIGN_UP } from "../graphql/mutations";

import useSignIn from "../hooks/useSignIn";

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP, { fetchPolicy: "no-cache" });
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    const { data: user } = await mutate({
      variables: { user: { username, password } },
    });
    console.log(user);
    // sign in after successful sign up to get access token
    if (user.createUser.username === username) {
      const data = await signIn({
        username,
        password,
      });
      return data;
    }
  };
  return [signUp, result];
};

export default useSignUp;
