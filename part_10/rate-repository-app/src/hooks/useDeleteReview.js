import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";
import useCurrentUser from "./useCurrentUser";

const useDeleteReview = () => {
  const { refreshUser } = useCurrentUser();

  const [mutate, result] = useMutation(DELETE_REVIEW, {
    fetchPolicy: "no-cache",
  });

  const deleteReview = async ({ id }) => {
    const { data } = await mutate({ variables: { deleteReviewId: id } });
    //console.log(data);
    if (data?.deleteReview) {
      console.log("Refreshing current user data");
      await refreshUser();
    }
    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
