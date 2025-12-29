import { View, StyleSheet, Button } from "react-native";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";

import FormInput from "./FormInput";

const initialCredentials = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters long")
    .required("Username is mandatory"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is mandatory"),
});

const SignInContainer = ({ onSignIn }) => {
  const credentials = useFormik({
    initialValues: initialCredentials,
    validationSchema,
    onSubmit: onSignIn,
  });

  return (
    <View style={styles.container}>
      <FormInput
        formik={credentials}
        fieldName="username"
        placeHolder="Username"
      />
      <FormInput
        formik={credentials}
        fieldName="password"
        placeHolder="Password"
        secureTextEntry
      />
      <Button
        testID="signInButton"
        disabled={!!Object.keys(credentials.errors).length}
        title="Sign In"
        onPress={credentials.handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
});

export default SignInContainer;
