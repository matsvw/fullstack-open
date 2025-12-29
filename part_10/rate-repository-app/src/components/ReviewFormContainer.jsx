import { View, StyleSheet, Button } from "react-native";
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from "yup";

import FormInput from "./FormInput";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  text: "",
  rating: 0,
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
        formik={review}
        fieldName="ownerName"
        placeHolder="Repository owner name"
      />
      <FormInput
        formik={review}
        fieldName="repositoryName"
        placeHolder="Repository name"
      />
      <FormInput
        formik={review}
        fieldName="rating"
        placeHolder="Rating between 0 and 100"
      />
      <FormInput formik={review} fieldName="text" placeHolder="Review" />

      <Button
        testID="reviewButton"
        disabled={!!Object.keys(review.errors).length}
        title="Create a Review"
        onPress={review.handleSubmit}
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

export default ReviewFormContainer;
