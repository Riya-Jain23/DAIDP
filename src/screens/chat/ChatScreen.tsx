import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  ChatBubble,
  ChatInput,
  GroceryAgentSheet,
  NutritionScoutCard,
  TypingIndicator,
} from '../../components/chat';
import {useChatStore, useChildStore} from '../../store';
import {MOCK_CHILD, THINKING_STATES} from '../../utils/mockData';
import {formatTimestamp} from '../../utils/formatting';
import {GrocerySuggestion, Message} from '../../types/chat';
import {Colors, FontFamily, FontSize, Spacing} from '../../theme';

const EmptyChatScreen: React.FC<{
  childName: string;
  onSelectPrompt: (text: string) => void;
}> = ({childName, onSelectPrompt}) => {
  const prompts = [
    `${childName} refused dal again today`,
    'What should I put in the tiffin tomorrow?',
    `Doctor said ${childName} needs more iron — what can I do?`,
  ];

  return (
    <View style={emptyStyles.container}>
      <Text style={emptyStyles.leafIcon}>🌿</Text>
      <Text style={emptyStyles.heading}>
        Ask me anything about {childName}&apos;s meals
      </Text>
      <Text style={emptyStyles.subheading}>
        I know their profile, history, and what works.
      </Text>
      <View style={emptyStyles.prompts}>
        {prompts.map((prompt) => (
          <TouchableOpacity
            key={prompt}
            style={emptyStyles.promptCard}
            onPress={() => onSelectPrompt(prompt)}
            activeOpacity={0.75}>
            <Text style={emptyStyles.promptText}>{prompt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

interface ChatScreenProps {
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const child = useChildStore((s) => s.child) || MOCK_CHILD;
  const messages = useChatStore((s) => s.messages);
  const isThinking = useChatStore((s) => s.isThinking);
  const thinkingStatus = useChatStore((s) => s.thinkingStatus);
  const addMessage = useChatStore((s) => s.addMessage);
  const setThinking = useChatStore((s) => s.setThinking);
  const setThinkingStatus = useChatStore((s) => s.setThinkingStatus);
  const composerDraft = useChatStore((s) => s.composerDraft);
  const setComposerDraft = useChatStore((s) => s.setComposerDraft);

  const flatListRef = useRef<FlatList>(null);
  const thinkingInterval = useRef<NodeJS.Timeout | null>(null);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [sheetData, setSheetData] = useState<GrocerySuggestion | null>(null);

  useEffect(() => {
    return () => {
      if (thinkingInterval.current) {
        clearInterval(thinkingInterval.current);
      }
    };
  }, []);

  const simulateResponse = useCallback(
    (userMessage: string) => {
      setThinking(true);
      let stateIndex = 0;
      setThinkingStatus(THINKING_STATES[0].replace("Arjun's", `${child.name}'s`));

      thinkingInterval.current = setInterval(() => {
        stateIndex = (stateIndex + 1) % THINKING_STATES.length;
        setThinkingStatus(
          THINKING_STATES[stateIndex].replace("Arjun's", `${child.name}'s`),
        );
      }, 1500);

      setTimeout(() => {
        if (thinkingInterval.current) {
          clearInterval(thinkingInterval.current);
        }

        setThinking(false);

        const lowerMessage = userMessage.toLowerCase();
        const assistantMessage: Message = lowerMessage.includes('iron')
          ? {
              id: `${Date.now()}-assistant`,
              role: 'assistant',
              content:
                "Let's work with the foods your child already accepts before adding anything new.",
              timestamp: new Date().toISOString(),
              metadata: {
                type: 'scout',
                topic: 'Iron',
                scoutData: {
                  flag: 'iron',
                  summary:
                    `${child.name} already eats chole and rajma. Improving absorption is the fastest next step.`,
                  strategies: [],
                  estimatedGapClosure: 0.4,
                  dailyRequirement: '10mg',
                  estimatedIntake: '6mg',
                  gap: '4mg',
                },
              },
            }
          : {
              id: `${Date.now()}-assistant`,
              role: 'assistant',
              content:
                `One easy next step is dal paratha. It keeps dal hidden inside a familiar form, and if you're out of ragi flour I can help add it to your grocery cart too.`,
              timestamp: new Date().toISOString(),
              metadata: {
                topic: 'Dal',
                recipeSuggestion: {
                  dishName: 'Dal Paratha',
                  childName: child.name,
                  adaptationNote:
                    `Adapted for ${child.name} — dal is hidden inside the dough. Looks like a normal roti.`,
                },
                grocerySuggestion: {
                  context:
                    `Poshan suggested ragi flour as a nutritious substitute for maida in ${child.name}'s pancakes.`,
                  productName: 'Ragi Flour (500g)',
                  benefit: 'Good source of calcium and iron',
                },
              },
            };

        addMessage(assistantMessage);
      }, 2500);
    },
    [addMessage, child.name, setThinking, setThinkingStatus],
  );

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      addMessage(userMessage);
      setComposerDraft('');
      setTimeout(() => simulateResponse(trimmed), 300);
    },
    [addMessage, setComposerDraft, simulateResponse],
  );

  const handleOpenGrocerySheet = (suggestion: GrocerySuggestion) => {
    setSheetData(suggestion);
    setSheetVisible(true);
  };

  const renderMessage = ({item}: {item: Message}) => {
    const isAI = item.role === 'assistant';
    const actionButtons = [...(item.metadata?.actionButtons || [])];

    if (item.metadata?.recipeSuggestion) {
      actionButtons.push({
        label: 'View recipe →',
        variant: 'outlined',
        onPress: () => navigation.navigate('Recipe', item.metadata?.recipeSuggestion),
      });
    }

    if (item.metadata?.grocerySuggestion) {
      actionButtons.push({
        label: 'Add ingredient to cart',
        variant: 'primary',
        onPress: () =>
          handleOpenGrocerySheet(item.metadata?.grocerySuggestion as GrocerySuggestion),
      });
    }

    return (
      <ChatBubble
        variant={isAI ? 'ai' : 'parent'}
        showLabel={isAI}
        timestamp={formatTimestamp(item.timestamp)}
        actionButtons={actionButtons}>
        {item.metadata?.type === 'scout' && item.metadata.scoutData ? (
          <View>
            <Text style={styles.messageText}>{item.content}</Text>
            <NutritionScoutCard
              data={item.metadata.scoutData}
              onPress={() => navigation.navigate('NutritionScout')}
            />
          </View>
        ) : (
          <Text style={styles.messageText}>{item.content}</Text>
        )}
      </ChatBubble>
    );
  };

  const isEmpty = messages.length === 0;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.topBar, {paddingTop: insets.top + 8}]}>
        <View style={styles.topBarLeft}>
          <Text style={styles.topBarTitle}>Poshan</Text>
          <View style={styles.activeDot} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ChatHistory')}>
          <Text style={styles.menuIcon}>···</Text>
        </TouchableOpacity>
      </View>

      {isEmpty ? (
        <EmptyChatScreen childName={child.name} onSelectPrompt={handleSend} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
          ListFooterComponent={
            isThinking ? <TypingIndicator statusText={thinkingStatus} /> : null
          }
        />
      )}

      <ChatInput
        onSend={handleSend}
        onMicPress={() => {}}
        onCameraPress={() => {}}
        value={composerDraft}
        onChangeText={setComposerDraft}
      />

      <GroceryAgentSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        contextText={sheetData?.context}
        productName={sheetData?.productName}
        benefit={sheetData?.benefit}
      />
    </KeyboardAvoidingView>
  );
};

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  leafIcon: {
    fontSize: 48,
    marginBottom: Spacing.base,
  },
  heading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subheading: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
  },
  prompts: {
    width: '100%',
    gap: Spacing.md,
  },
  promptCard: {
    backgroundColor: Colors.SURFACE,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 16,
    padding: Spacing.base,
  },
  promptText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.BG,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  topBarTitle: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.ACCENT,
  },
  menuIcon: {
    fontSize: 20,
    color: Colors.TEXT_SECONDARY,
    fontWeight: '700',
  },
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: Spacing.base,
    paddingBottom: Spacing.sm,
  },
  messageText: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
    lineHeight: 20,
  },
});

export default ChatScreen;
