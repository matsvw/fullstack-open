import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client/react";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import RepositoryView from "./RepositoryView";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

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
  ];

  console.log("user data: ", data);

  if (!loading && !error && data?.me?.username) {
    actions.push({
      linkTo: "/signout",
      label: "Sign Out",
    });
  } else {
    actions.push({
      linkTo: "/signin",
      label: "Sign In",
    });
  }

  console.log("Main rendering");

  return (
    <AppBar actions={actions}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/repositories" element={<RepositoryList />} />
        <Route path="/repositories/:id" element={<RepositoryView />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </AppBar>
  );
};

export default Main;
