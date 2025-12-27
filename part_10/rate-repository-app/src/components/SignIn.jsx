import { useNavigate } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer'

const SignIn = () => {
  //console.log("SignIn rendering");
  const [signIn] = useSignIn()
  const nav = useNavigate()

  const onSignIn = async (credentials, helpers) => {
    try {
      if (!helpers.errors) {
        console.log("Credentials: ", credentials.username, credentials.password);

        const data = await signIn({ username: credentials.username, password: credentials.password });
        helpers.resetForm();
        nav("/repositories");
      }
    }
    catch (error) {
      //console.log(error.graphQLErrors)
      alert(error.message);
      console.log(error.message);
    }

  }

  return (
    <SignInContainer onSignIn={onSignIn} />
  );
};

export default SignIn;