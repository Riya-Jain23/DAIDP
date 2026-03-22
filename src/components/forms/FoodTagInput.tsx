import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Tag from '../ui/Tag';
import {Colors, FontFamily, FontSize, BorderRadius, Spacing} from '../../theme';

interface FoodTagInputProps {
  foods: {id: string; name: string}[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  variant?: 'accepted' | 'refused';
  placeholder?: string;
}

const FoodTagInput: React.FC<FoodTagInputProps> = ({
  foods,
  onAdd,
  onRemove,
  variant = 'accepted',
  placeholder = 'Add a food...',
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const isDuplicate = foods.some(
      (f) => f.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (isDuplicate) {
      setInputValue('');
      return;
    }
    onAdd(trimmed);
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      {foods.length > 0 && (
        <View style={styles.tagsContainer}>
          {foods.map((food) => (
            <Tag
              key={food.id}
              label={food.name}
              variant={variant}
              removable
              onRemove={() => onRemove(food.id)}
            />
          ))}
        </View>
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          placeholder={placeholder}
          placeholderTextColor={Colors.TEXT_MUTED}
          onSubmitEditing={handleAdd}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.addButton, !inputValue.trim() && styles.addButtonDisabled]}
          onPress={handleAdd}
          disabled={!inputValue.trim()}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    paddingHorizontal: Spacing.md,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: Colors.BORDER,
  },
  addButtonText: {
    color: Colors.TEXT_INVERSE,
    fontSize: FontSize.xl,
    fontFamily: FontFamily.BODY_BOLD,
  },
});

export default FoodTagInput;
