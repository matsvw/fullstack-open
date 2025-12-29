import { View, StyleSheet, Button } from "react-native";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";

import FormInput from "./FormInput";

const initialCredentials = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username cannot be over 30 characters long")
    .required("Username is mandatory"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password cannot be over 50 characters long")
    .required("Password is mandatory"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Password confirmation is required"),
});

const SignUpContainer = ({ onSignUp }) => {
  const credentials = useFormik({
    initialValues: initialCredentials,
    validationSchema,
    onSubmit: onSignUp,
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
      <FormInput
        formik={credentials}
        fieldName="passwordConfirmation"
        placeHolder="Confirm password"
        secureTextEntry
      />
      <Button
        testID="signUpButton"
        disabled={!!Object.keys(credentials.errors).length}
        title="Sign Up"
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

export default SignUpContainer;
