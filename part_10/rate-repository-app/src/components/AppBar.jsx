import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const APPBAR_HEIGHT = 56;

export default function AppBar({ actions = [], children }) {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        {/* Left-aligned text buttons */}
        <View style={styles.navRow}>
          {actions.map(({ label, onPress }, idx) => (
            <TouchableOpacity key={idx} onPress={onPress} style={styles.navButton}>
              <Text style={styles.navText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + APPBAR_HEIGHT,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  navText: {
    color: theme.colors.background,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
