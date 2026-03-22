import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Spacing} from '../../theme';

interface DividerProps {
  label?: string;
}

const Divider: React.FC<DividerProps> = ({label}) => {
  if (label) {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.line} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  }
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.BORDER,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BORDER,
  },
  label: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_MUTED,
  },
});

export default Divider;
