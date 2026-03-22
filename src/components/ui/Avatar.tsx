import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

interface AvatarProps {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  size = 40,
  backgroundColor = Colors.AI_BUBBLE,
  textColor = Colors.PRIMARY,
}) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
        },
      ]}>
      <Text
        style={[
          styles.initial,
          {
            color: textColor,
            fontSize: size * 0.4,
          },
        ]}>
        {initial}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: FontFamily.BODY_BOLD,
  },
});

export default Avatar;
