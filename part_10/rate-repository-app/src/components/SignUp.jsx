import { useNavigate } from "react-router-native";

import useSignUp from "../hooks/useSignUp";
import SignUpContainer from "./SignUpContainer";

const SignUp = () => {
  const [signUp] = useSignUp();
  const nav = useNavigate();

  const onSignUp = async (credentials, helpers) => {
    try {
      if (!helpers.errors) {
        console.log(
          "Credentials: ",
          credentials.username,
          credentials.password
        );

        const data = await signUp({
          username: credentials.username,
          password: credentials.password,
        });
        helpers.resetForm();
        nav("/repositories");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  return <SignUpContainer onSignUp={onSignUp} />;
};

export default SignUp;
