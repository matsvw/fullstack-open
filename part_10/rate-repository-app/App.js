import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

/*
if (__DEV__) {
  // For RN to connect to the standalone DevTools on a custom port
  require('react-devtools-core').connectToDevTools({
    host: 'localhost', // or your machine IP if using a device
    port: 8098,
  });
}
*/

const App = () => {
  console.log("App rendering");

  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  )
};

export default App;