import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme'

import useSignOut from '../hooks/useSignOut';

const SignOut = () => {
  const [signOut] = useSignOut();

  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
    }
    doSignOut();
  }, []);

  return (
    <View style={styles.container}>
      <Text>You have been logged out</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.background,
  },
});

export default SignOut;