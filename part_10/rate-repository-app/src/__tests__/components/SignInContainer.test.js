import { render, fireEvent, screen } from "@testing-library/react-native";
import SignInContainer from "../../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("signin fires correct event and submits correct values", () => {
      async () => {
        const onSignIn = jest.fn();
        render(<SignInContainer onSignIn={onSignIn} />);

        fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
        fireEvent.changeText(
          screen.getByPlaceholderText("Password"),
          "password2"
        );
        fireEvent.press(screen.getByText("Sign In"));

        await waitFor(() => {
          expect(onSignIn).toHaveBeenCalledTimes(2);

          console.log("Received mock calls: ", onSignIn.mock.calls);

          // onSubmit.mock.calls[0][0] contains the first argument of the first call
          expect(onSignIn.mock.calls[0][0]).toEqual({
            username: "kalle",
            password: "password",
          });
        });
        console.log("Received mock calls: ", onSignIn.mock.calls);
      };
    });
  });
});
