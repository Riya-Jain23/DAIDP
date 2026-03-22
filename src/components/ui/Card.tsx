import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, BorderRadius, Spacing, Shadows} from '../../theme';

interface CardProps {
  children: React.ReactNode;
  leftBorder?: string;
  tinted?: boolean;
  style?: ViewStyle;
  noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  leftBorder,
  tinted = false,
  style,
  noPadding = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        Shadows.card,
        tinted && styles.tinted,
        leftBorder && {borderLeftWidth: 4, borderLeftColor: leftBorder},
        noPadding && {padding: 0},
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
  },
  tinted: {
    backgroundColor: Colors.AI_BUBBLE,
  },
});

export default Card;
