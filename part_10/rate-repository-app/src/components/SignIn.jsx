import { View, StyleSheet, TextInput, Button } from 'react-native';
import theme from '../theme'
import { useFormik } from 'formik';

const initialCredentials = {
  username: '',
  password: ''
};

const onSignIn = (credentials, helpers) => {
  console.log("Credentials: ", credentials.username, credentials.password);
  helpers.resetForm();
}


const SignIn = () => {
  //console.log("SignIn rendering");

  const credentials = useFormik({
    initialValues: initialCredentials,
    onSubmit: onSignIn,
  });

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Username' value={credentials.values.username} onChangeText={credentials.handleChange('username')} />
      <TextInput style={styles.input} placeholder='Password' value={credentials.values.password} onChangeText={credentials.handleChange('password')} secureTextEntry />
      <Button style={styles.button} title="Sign In" onPress={credentials.handleSubmit} />
    </View>

  );
};

const BASIC_COMPONENT = {
  borderRadius: theme.boxes.radius,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    ...BASIC_COMPONENT
  },
  button: {
    ...BASIC_COMPONENT
  }
});

export default SignIn;