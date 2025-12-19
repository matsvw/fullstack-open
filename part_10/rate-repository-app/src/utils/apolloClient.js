import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

const APOLLO_URL = process.env.EXPO_PUBLIC_APOLLO_URL;

const createApolloClient = () => {

  if (!APOLLO_URL) {
    throw new Error('EXPO_PUBLIC_APOLLO_URL is not defined');
  }

  const uri = `${APOLLO_URL}/graphql`;
  console.log("Apollo uri:", uri);

  const httpLink = new HttpLink({
    uri: uri,
    // headers: { authorization: `Bearer ${token}` },
    // credentials: 'include',
    // fetch, // supply a custom fetch if you need one
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    name: "rate-repository-app",
    queryDeduplication: false,
  });
};

export default createApolloClient;
