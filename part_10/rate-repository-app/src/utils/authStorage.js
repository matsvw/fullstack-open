import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.tokenKey = `${namespace}:accessToken`;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(
      `${this.tokenKey}`,
    );

    return token;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.tokenKey}`,
      accessToken,
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.tokenKey}`);
  }
}

export default AuthStorage;