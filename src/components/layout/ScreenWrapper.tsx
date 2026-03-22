import React from 'react';
import {View, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scroll?: boolean;
  bgColor?: string;
  padded?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scroll = false,
  bgColor = Colors.BG,
  padded = true,
  statusBarStyle = 'dark-content',
}) => {
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: bgColor,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    padded && styles.padded,
  ];

  return (
    <View style={containerStyle}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={bgColor}
        translucent
      />
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default ScreenWrapper;
