import { useNavigate } from "react-router-native";
import ReviewFormContainer from "./ReviewFormContainer";
import useReview from "../hooks/useReview";

const ReviewForm = () => {
  const [createReview] = useReview();
  const nav = useNavigate();

  const onSubmit = async (review, helpers) => {
    try {
      if (!helpers.errors) {
        console.log("Review: ", review);

        const reviewVariables = {
          review: {
            ownerName: review.ownerName,
            rating: Number(review.rating),
            repositoryName: review.repositoryName,
            text: review.text,
          },
        };

        const data = await createReview(reviewVariables);
        const repositoryId = data?.createReview?.repositoryId;
        console.log(repositoryId);
        helpers.resetForm();
        nav(`/repositories/${repositoryId}`);
      }
    } catch (error) {
      //console.log(error.graphQLErrors)
      alert(error.message);
      console.log(error.message);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
