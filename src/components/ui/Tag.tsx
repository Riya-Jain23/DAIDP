import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

type TagVariant = 'accepted' | 'refused' | 'progress' | 'neutral';
type TagSize = 'sm' | 'md';

interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  removable?: boolean;
  onRemove?: () => void;
  icon?: React.ReactNode;
  onPress?: () => void;
}

const variantStyles: Record<TagVariant, {bg: string; text: string}> = {
  accepted: {bg: Colors.AI_BUBBLE, text: Colors.PRIMARY},
  refused: {bg: Colors.ERROR_LIGHT, text: '#991B1B'},
  progress: {bg: Colors.AMBER_LIGHT, text: '#D97706'},
  neutral: {bg: Colors.SURFACE_2, text: Colors.TEXT_SECONDARY},
};

const Tag: React.FC<TagProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  removable = false,
  onRemove,
  icon,
  onPress,
}) => {
  const {bg, text} = variantStyles[variant];
  const isSmall = size === 'sm';

  const content = (
    <View
      style={[
        styles.container,
        {backgroundColor: bg},
        isSmall && styles.containerSmall,
      ]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.label,
          {color: text},
          isSmall && styles.labelSmall,
        ]}>
        {label}
      </Text>
      {removable && (
        <TouchableOpacity
          onPress={onRemove}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Text style={[styles.removeIcon, {color: text}]}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.sm,
    gap: Spacing.xs,
  },
  containerSmall: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  icon: {
    marginRight: 2,
  },
  label: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
  },
  labelSmall: {
    fontSize: FontSize.xs,
  },
  removeIcon: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    marginLeft: 2,
  },
});

export default Tag;
