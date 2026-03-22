import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

interface ActionButtonData {
  label: string;
  variant: 'primary' | 'outlined';
  onPress: () => void;
}

interface ChatBubbleProps {
  variant: 'parent' | 'ai';
  children: React.ReactNode;
  showLabel?: boolean;
  timestamp?: string;
  actionButtons?: ActionButtonData[];
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  variant,
  children,
  showLabel = false,
  timestamp,
  actionButtons,
}) => {
  const isAI = variant === 'ai';

  return (
    <View style={[styles.container, isAI ? styles.containerAI : styles.containerParent]}>
      {isAI && showLabel && <Text style={styles.aiLabel}>Poshan</Text>}
      <View style={[styles.bubble, isAI ? styles.bubbleAI : styles.bubbleParent]}>
        {typeof children === 'string' ? (
          <Text style={[styles.text, isAI ? styles.textAI : styles.textParent]}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {actionButtons && actionButtons.length > 0 && (
        <View style={styles.actionsRow}>
          {actionButtons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.actionButton,
                btn.variant === 'primary'
                  ? styles.actionPrimary
                  : styles.actionOutlined,
              ]}
              onPress={btn.onPress}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.actionText,
                  btn.variant === 'primary'
                    ? styles.actionTextPrimary
                    : styles.actionTextOutlined,
                ]}>
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
    maxWidth: '82%',
  },
  containerAI: {
    alignSelf: 'flex-start',
  },
  containerParent: {
    alignSelf: 'flex-end',
  },
  aiLabel: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
    marginBottom: 4,
    marginLeft: 4,
  },
  bubble: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  bubbleAI: {
    backgroundColor: Colors.AI_BUBBLE,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
  },
  bubbleParent: {
    backgroundColor: Colors.SURFACE_2,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 4,
  },
  text: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    lineHeight: 20,
  },
  textAI: {
    color: Colors.TEXT_PRIMARY,
  },
  textParent: {
    color: Colors.TEXT_PRIMARY,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  actionButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  actionPrimary: {
    backgroundColor: Colors.PRIMARY,
  },
  actionOutlined: {
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.SURFACE,
  },
  actionText: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.sm,
  },
  actionTextPrimary: {
    color: Colors.TEXT_INVERSE,
  },
  actionTextOutlined: {
    color: Colors.TEXT_PRIMARY,
  },
  timestamp: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default ChatBubble;
