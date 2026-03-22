import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

interface ChatInputProps {
  onSend: (text: string) => void;
  onMicPress?: () => void;
  onCameraPress?: () => void;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onMicPress,
  onCameraPress,
  placeholder = 'Type or speak...',
  value,
  onChangeText,
}) => {
  const [internalText, setInternalText] = useState('');
  const text = value ?? internalText;
  const handleChangeText = onChangeText ?? setInternalText;

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    handleChangeText('');
  };

  const hasText = text.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.iconButton} onPress={onMicPress}>
          <Text style={styles.iconText}>🎤</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.TEXT_MUTED}
          multiline
          maxLength={2000}
          textAlignVertical="center"
        />

        <TouchableOpacity style={styles.iconButton} onPress={onCameraPress}>
          <Text style={styles.iconText}>📷</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendButton, !hasText && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!hasText}>
          <Text style={styles.sendIcon}>↑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SURFACE,
    borderTopWidth: 1,
    borderTopColor: Colors.BORDER,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingBottom: Spacing.base,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    minHeight: 36,
    maxHeight: 100,
    backgroundColor: Colors.SURFACE_2,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.BORDER,
  },
  sendIcon: {
    color: Colors.TEXT_INVERSE,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ChatInput;
