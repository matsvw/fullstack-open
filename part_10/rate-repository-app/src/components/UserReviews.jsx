import Text from "./Text";
import useCurrentUser from "../hooks/useCurrentUser";
import ReviewListContainer from "./ReviewListContainer";

const UserReviews = () => {
  const { user, loading, error } = useCurrentUser();

  if (loading) {
    return <Text>Loading data...</Text>;
  }

  if (error) {
    console.log(error);
    return <Text>There was an error loading data</Text>;
  }

  const reviews = user?.reviews
    ? user.reviews.edges.map((edge) => edge.node)
    : [];

  if (reviews.length === 0) {
    return <Text>You have not submitted any reviews yet</Text>;
  }

  return <ReviewListContainer reviews={reviews} />;
};

export default UserReviews;
