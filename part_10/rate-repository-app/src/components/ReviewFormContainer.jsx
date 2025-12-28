import { View, StyleSheet, TextInput, Button } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { useFormik, yupToFormErrors } from "formik";
import * as yup from "yup";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  text: "",
  rating: 0,
};

const FormInput = ({ review, fieldName, placeHolder }) => {
  const hasError = (field) => review.touched[field] && review.errors[field];

  return (
    <>
      <TextInput
        style={hasError(fieldName) ? styles.inputError : styles.input}
        placeholder={placeHolder}
        value={review.values[fieldName]}
        onBlur={review.handleBlur(fieldName)}
        onChangeText={review.handleChange(fieldName)}
      />
      {hasError(fieldName) && (
        <Text style={styles.errorMessage}>{review.errors[fieldName]}</Text>
      )}
    </>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .min(3, "Owner username must be at least 3 characters long")
    .required("Owner username is mandatory"),
  repositoryName: yup
    .string()
    .min(3, "Repository name must be at least 3 characters long")
    .required("Repository name is mandatory"),
  text: yup.string().optional(),
  rating: yup
    .number()
    .required("Rating is mandatory")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100")
    .integer(),
});

const ReviewFormContainer = ({ onSubmit }) => {
  const review = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <FormInput
        review={review}
        fieldName="ownerName"
        placeHolder="Repository owner name"
      />
      <FormInput
        review={review}
        fieldName="repositoryName"
        placeHolder="Repository name"
      />
      <FormInput
        review={review}
        fieldName="rating"
        placeHolder="Rating between 0 and 100"
      />
      <FormInput review={review} fieldName="text" placeHolder="Review" />

      <Button
        testID="reviewButton"
        disabled={!!Object.keys(review.errors).length}
        style={styles.button}
        title="Create a Review"
        onPress={review.handleSubmit}
      />
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
  button: {
    fontFamily: theme.fonts.main,
    borderRadius: theme.boxes.radius,
  },
});

export default ReviewFormContainer;
