import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, Spacing} from '../../theme';

interface SectionHeaderProps {
  title?: string;
  label?: string;
  emoji?: string;
  actionLabel?: string;
  onAction?: () => void;
  color?: string;
  rightAction?: {
    label: string;
    onPress: () => void;
  };
  variant?: 'default' | 'eyebrow';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  label,
  emoji,
  actionLabel,
  onAction,
  color = Colors.TEXT_SECONDARY,
  rightAction,
  variant = 'default',
}) => {
  const resolvedTitle = label ?? title ?? '';
  const action =
    rightAction ||
    (actionLabel && onAction
      ? {
          label: actionLabel,
          onPress: onAction,
        }
      : null);
  const isEyebrow = variant === 'eyebrow' || Boolean(label);

  return (
    <View style={styles.container}>
      <Text
        style={[
          isEyebrow ? styles.eyebrow : styles.title,
          isEyebrow && {color},
        ]}>
        {resolvedTitle} {emoji}
      </Text>
      {action && (
        <TouchableOpacity onPress={action.onPress}>
          <Text style={isEyebrow ? styles.actionSmall : styles.action}>
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.lg,
    color: Colors.TEXT_PRIMARY,
  },
  eyebrow: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.TEXT_SECONDARY,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  action: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  actionSmall: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
});

export default SectionHeader;
