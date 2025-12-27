import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
  userEvent,
} from "@testing-library/react-native";
import SignInContainer from "../../components/SignInContainer";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("signin fires correct event and submits correct values", async () => {
      const onSignIn = jest.fn();
      const user = userEvent.setup();
      render(<SignInContainer onSignIn={onSignIn} />);

      //Must use user event to fire the blur events
      const unField = screen.getByPlaceholderText("Username");
      await user.type(unField, "kalle");

      const pwField = screen.getByPlaceholderText("Password");
      await user.type(pwField, "password");

      act(() => {
        fireEvent.press(screen.getByTestId("signInButton"));
      });

      await waitFor(() => {
        //console.log("Received mock calls: ", onSignIn.mock.calls);
        expect(onSignIn).toHaveBeenCalledTimes(1);

        // onSubmit.mock.calls[0][0] contains the first argument of the first call
        expect(onSignIn.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
