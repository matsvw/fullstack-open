import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../theme';

const APPBAR_HEIGHT = 56;

export default function AppBar({ actions = [], children }) {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.navRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator fadingEdgeLength={{ start: 0, end: 10 }}>
            {actions.map(({ label, linkTo }, idx) => (
              <Link key={idx} to={linkTo} style={styles.navButton}>
                <Text style={styles.navText}>{label}</Text>
              </Link>
            ))}
          </ScrollView>
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
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: theme.colors.opaque,
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
