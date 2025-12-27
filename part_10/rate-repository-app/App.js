import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client/react";
import Main from "./src/components/Main";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

/*
if (__DEV__) {
  // For RN to connect to the standalone DevTools on a custom port
  require('react-devtools-core').connectToDevTools({
    host: 'localhost', // or your machine IP if using a device
    port: 8098,
  });
}
*/
import Constants from "expo-constants";

console.log(
  "🔍 Full Constants.expoConfig:",
  JSON.stringify(Constants.expoConfig, null, 2)
);
console.log("📦 Extra object:", Constants.expoConfig?.extra);
console.log("🌐 Direct env var:", process.env.EXPO_PUBLIC_APOLLO_URL);

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;
