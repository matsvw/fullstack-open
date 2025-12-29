import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client/react";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import RepositoryView from "./RepositoryView";
import ReviewForm from "./ReviewForm";
import UserReviews from "./UserReviews";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";

import { GET_ME } from "../graphql/queries";

const Main = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: "no-cache",
  });

  const actions = [
    {
      linkTo: "/repositories",
      label: "Repository",
    },
    {
      linkTo: "/review",
      label: "Create a review",
    },
  ];

  console.log("user data: ", data);

  if (!loading && !error && data?.me?.username) {
    actions.push({
      linkTo: "/userreviews",
      label: "My reviews",
    });
    actions.push({
      linkTo: "/signout",
      label: "Sign Out",
    });
  } else {
    actions.push({
      linkTo: "/signin",
      label: "Sign In",
    });
    actions.push({
      linkTo: "/signup",
      label: "Sign Up",
    });
  }

  console.log("Main rendering");

  return (
    <AppBar actions={actions}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<RepositoryView />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/userreviews" element={<UserReviews />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </AppBar>
  );
};

export default Main;
