import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { SetContextLink } from "@apollo/client/link/context";
import Constants from "expo-constants";

import AuthStorage from "./authStorage";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const APOLLO_URL = process.env.EXPO_PUBLIC_APOLLO_URL; // Using this, as Constants is serving up stale values for some reason
//const APOLLO_URL = Constants.expoConfig.extra.APOLLO_URL;
//const APOLLO_URL = "http://192.168.86.22:4000";

const createApolloClient = () => {
  if (!APOLLO_URL) {
    throw new Error("EXPO_PUBLIC_APOLLO_URL is not defined");
  }

  const uri = `${APOLLO_URL}/graphql`;
  console.log("Apollo uri:", uri);

  const authStorage = new AuthStorage();

  const httpLink = new HttpLink({
    uri: uri,
    // headers: { authorization: `Bearer ${token}` },
    // credentials: 'include',
    // fetch, // supply a custom fetch if you need one
  });

  const authLink = new SetContextLink(async ({ headers }, operation) => {
    try {
      console.log(operation);
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    name: "rate-repository-app",
    queryDeduplication: false,
  });
};

export default createApolloClient;
