import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { useFonts } from 'expo-font';
import Text from './src/components/Text';

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

  const [fontsLoaded] = useFonts({
    Arial: require('./assets/fonts/Arial.ttf'),
    Roboto: require('./assets/fonts/Roboto.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts…</Text>; // Fallback content
  }

  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  )
};

export default App;