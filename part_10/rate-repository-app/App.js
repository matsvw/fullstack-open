import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';

/*
if (__DEV__) {
  // For RN to connect to the standalone DevTools on a custom port
  require('react-devtools-core').connectToDevTools({
    host: 'localhost', // or your machine IP if using a device
    port: 8098,
  });
}
*/

const apolloClient = createApolloClient();

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;