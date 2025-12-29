import { StyleSheet, TextInput } from "react-native";
import Text from "./Text";
import theme from "../theme";

const FormInput = ({
  formik,
  fieldName,
  placeHolder,
  secureTextEntry = false,
}) => {
  const hasError = (field) => formik.touched[field] && formik.errors[field];

  return (
    <>
      <TextInput
        style={hasError(fieldName) ? styles.inputError : styles.input}
        placeholder={placeHolder}
        value={formik.values[fieldName]}
        onBlur={formik.handleBlur(fieldName)}
        onChangeText={formik.handleChange(fieldName)}
        secureTextEntry={secureTextEntry}
      />
      {hasError(fieldName) && (
        <Text style={styles.errorMessage}>{formik.errors[fieldName]}</Text>
      )}
    </>
  );
};

export default FormInput;

const INPUT = {
  fontFamily: theme.fonts.main,
  borderRadius: theme.boxes.radius,
  borderWidth: 1,
  marginBottom: 10,
  padding: 10,
};

const styles = StyleSheet.create({
  input: {
    ...INPUT,
  },
  inputError: {
    borderColor: theme.colors.error,
    ...INPUT,
  },
  errorMessage: {
    color: theme.colors.error,
    marginBottom: 10,
  },
});
