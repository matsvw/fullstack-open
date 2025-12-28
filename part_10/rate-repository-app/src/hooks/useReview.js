import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    fetchPolicy: "no-cache",
  });

  const createReview = async ({ review }) => {
    const { data } = await mutate({ variables: { review } });
    //console.log(data);

    return data;
  };

  return [createReview, result];
};

export default useReview;
