import { View, StyleSheet, TextInput, Button } from 'react-native';
import Text from './Text';
import theme from '../theme'
import { useFormik } from 'formik';
import * as yup from 'yup';

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


const onSignIn = (credentials, helpers) => {
  console.log("Credentials: ", credentials.username, credentials.password);
  if (!helpers.errors) {
    helpers.resetForm();
  }
}


const SignIn = () => {
  //console.log("SignIn rendering");

  const credentials = useFormik({
    initialValues: initialCredentials,
    validationSchema,
    onSubmit: onSignIn,
  });

  const unError = () => {
    return (credentials.touched.username && credentials.errors.username)
  }
  const pwdError = () => {
    return (credentials.touched.password && credentials.errors.password)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={unError() ? styles.inputError : styles.input}
        placeholder='Username'
        value={credentials.values.username}
        onBlur={credentials.handleBlur('username')}
        onChangeText={credentials.handleChange('username')}
      />
      {unError() && (
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
      <Button style={styles.button} title="Sign In" onPress={credentials.handleSubmit} />
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