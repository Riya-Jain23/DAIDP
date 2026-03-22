import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

type ButtonVariant = 'primary' | 'outlined' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
}) => {
  const containerStyle: ViewStyle[] = [
    styles.base,
    styles[`container_${variant}`],
    styles[`size_${size}`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.label,
    styles[`label_${variant}`],
    styles[`labelSize_${size}`],
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.TEXT_INVERSE : Colors.PRIMARY}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text style={textStyle}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.4,
  },

  // Variants
  container_primary: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: BorderRadius['2xl'],
  },
  container_outlined: {
    backgroundColor: 'transparent',
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1.5,
    borderColor: Colors.PRIMARY,
  },
  container_ghost: {
    backgroundColor: 'transparent',
    borderRadius: BorderRadius['2xl'],
  },
  container_danger: {
    backgroundColor: Colors.ERROR,
    borderRadius: BorderRadius['2xl'],
  },

  // Sizes
  size_sm: {
    height: 36,
    paddingHorizontal: Spacing.base,
  },
  size_md: {
    height: 44,
    paddingHorizontal: Spacing.lg,
  },
  size_lg: {
    height: 56,
    paddingHorizontal: Spacing.xl,
  },

  // Labels
  label: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
  },
  label_primary: {
    color: Colors.TEXT_INVERSE,
  },
  label_outlined: {
    color: Colors.PRIMARY,
  },
  label_ghost: {
    color: Colors.PRIMARY,
  },
  label_danger: {
    color: Colors.TEXT_INVERSE,
  },
  labelSize_sm: {
    fontSize: FontSize.sm,
  },
  labelSize_md: {
    fontSize: FontSize.base,
  },
  labelSize_lg: {
    fontSize: FontSize.lg,
  },
});

export default Button;
