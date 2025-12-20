import { View, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme'
import { useFormik } from 'formik';
import * as yup from 'yup';

import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';

const initialCredentials = {
  username: '',
  password: ''
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .required('Username is mandatory'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is mandatory'),
});

const SignIn = () => {
  //console.log("SignIn rendering");
  const [signIn] = useSignIn()
  const authStorage = new AuthStorage();
  const nav = useNavigate()

  const onSignIn = async (credentials, helpers) => {
    try {
      if (!helpers.errors) {
        console.log("Credentials: ", credentials.username, credentials.password);

        const data = await signIn({ username: credentials.username, password: credentials.password });
        const token = data.authenticate.accessToken;
        console.log(token);
        authStorage.setAccessToken(token);
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

  const credentials = useFormik({
    initialValues: initialCredentials,
    validationSchema,
    onSubmit: onSignIn,
  });

  const usernameError = () => {
    return (credentials.touched.username && credentials.errors.username)
  }
  const pwdError = () => {
    return (credentials.touched.password && credentials.errors.password)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={usernameError() ? styles.inputError : styles.input}
        placeholder='Username'
        value={credentials.values.username}
        onBlur={credentials.handleBlur('username')}
        onChangeText={credentials.handleChange('username')}
      />
      {usernameError() && (
        <Text style={styles.errorMessage}>{credentials.errors.username}</Text>
      )}
      <TextInput
        style={pwdError() ? styles.inputError : styles.input}
        placeholder='Password'
        value={credentials.values.password}
        onBlur={credentials.handleBlur('password')}
        onChangeText={credentials.handleChange('password')}
        secureTextEntry
      />
      {pwdError() && (
        <Text style={styles.errorMessage}>{credentials.errors.password}</Text>
      )}
      <Button disabled={usernameError() || pwdError()} style={styles.button} title="Sign In" onPress={credentials.handleSubmit} />
    </View>
  );
};

const INPUT = {
  fontFamily: theme.fonts.main,
  borderRadius: theme.boxes.radius,
  borderWidth: 1,
  marginBottom: 10,
  padding: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  input: {
    ...INPUT
  },
  inputError: {
    borderColor: theme.colors.error,
    ...INPUT
  },
  errorMessage: {
    color: theme.colors.error,
    marginBottom: 10,
  },
  button: {
    fontFamily: theme.fonts.main,
    borderRadius: theme.boxes.radius,
  }
});

export default SignIn;