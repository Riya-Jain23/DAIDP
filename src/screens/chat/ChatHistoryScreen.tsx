import React, {useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SectionHeader} from '../../components/layout';
import {useChatStore} from '../../store';
import {ChatSession} from '../../types/chat';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface ChatHistoryScreenProps {
  navigation: any;
}

const getTimestampLabel = (dateString: string) =>
  new Date(dateString).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });

const splitSessions = (sessions: ChatSession[]) => {
  const now = Date.now();

  return sessions.reduce(
    (groups, session) => {
      const daysAgo = Math.floor(
        (now - new Date(session.lastMessageAt).getTime()) / 86400000,
      );

      if (daysAgo <= 6) {
        groups.thisWeek.push(session);
      } else {
        groups.lastWeek.push(session);
      }

      return groups;
    },
    {thisWeek: [] as ChatSession[], lastWeek: [] as ChatSession[]},
  );
};

const ChatHistoryScreen: React.FC<ChatHistoryScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const sessions = useChatStore((s) => s.sessions);
  const loadSession = useChatStore((s) => s.loadSession);
  const [query, setQuery] = useState('');

  const filteredSessions = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase();

    if (!lowerQuery) {
      return sessions;
    }

    return sessions.filter(
      (session) =>
        session.lastMessage.toLowerCase().includes(lowerQuery) ||
        session.topic.toLowerCase().includes(lowerQuery),
    );
  }, [query, sessions]);

  const groups = useMemo(() => splitSessions(filteredSessions), [filteredSessions]);

  const handleOpenSession = (sessionId: string) => {
    loadSession(sessionId);
    navigation.navigate('ChatMain');
  };

  const renderSessionCard = (session: ChatSession, muted = false) => {
    const isWin = session.topic.toLowerCase().includes('win');

    return (
      <TouchableOpacity
        key={session.sessionId}
        style={[styles.sessionCard, muted && styles.sessionCardMuted]}
        onPress={() => handleOpenSession(session.sessionId)}
        activeOpacity={0.85}>
        <View style={styles.avatar}>
          <Text style={styles.avatarIcon}>🌿</Text>
        </View>
        <View style={styles.sessionCopy}>
          <View style={styles.sessionTopRow}>
            <Text style={styles.sessionAuthor}>Poshan</Text>
            <Text style={styles.sessionTime}>
              {getTimestampLabel(session.lastMessageAt)}
            </Text>
          </View>
          <Text style={styles.sessionPreview} numberOfLines={1}>
            {session.lastMessage}
          </Text>
          <View
            style={[
              styles.topicPill,
              isWin && styles.topicPillWin,
            ]}>
            <Text
              style={[
                styles.topicPillText,
                isWin && styles.topicPillTextWin,
              ]}>
              {session.topic}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Conversations</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            placeholder="Search conversations..."
            placeholderTextColor={Colors.TEXT_MUTED}
          />
        </View>

        {filteredSessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🗂️</Text>
            <Text style={styles.emptyHeading}>No conversations yet</Text>
            <Text style={styles.emptySubheading}>
              Your chats with Poshan will appear here.
            </Text>
          </View>
        ) : (
          <>
            {groups.thisWeek.length > 0 && (
              <View style={styles.section}>
                <SectionHeader label="This week" variant="eyebrow" />
                {groups.thisWeek.map((session) => renderSessionCard(session))}
              </View>
            )}

            {groups.lastWeek.length > 0 && (
              <View style={styles.section}>
                <SectionHeader label="Last week" variant="eyebrow" />
                {groups.lastWeek.map((session) => renderSessionCard(session, true))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

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
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    backgroundColor: Colors.SURFACE,
  },
  backIcon: {
    fontSize: 22,
    color: Colors.TEXT_PRIMARY,
  },
  title: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
  },
  placeholder: {
    width: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  searchBar: {
    height: 44,
    marginTop: 12,
    backgroundColor: Colors.SURFACE,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  searchIcon: {
    fontSize: 16,
    color: Colors.TEXT_MUTED,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.base,
    color: Colors.TEXT_PRIMARY,
  },
  section: {
    marginTop: Spacing.xl,
  },
  sessionCard: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.SURFACE,
    borderRadius: BorderRadius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    gap: Spacing.md,
    ...Shadows.card,
  },
  sessionCardMuted: {
    opacity: 0.6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.AI_BUBBLE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  sessionCopy: {
    flex: 1,
  },
  sessionTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sessionAuthor: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
  },
  sessionTime: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
  },
  sessionPreview: {
    marginTop: 4,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  topicPill: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: Colors.AI_BUBBLE,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },
  topicPillWin: {
    backgroundColor: Colors.AMBER_LIGHT,
  },
  topicPillText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.xs,
    color: Colors.PRIMARY,
  },
  topicPillTextWin: {
    color: '#D97706',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyIcon: {
    fontSize: 44,
    marginBottom: Spacing.base,
  },
  emptyHeading: {
    fontFamily: FontFamily.DISPLAY,
    fontSize: FontSize.xl,
    color: Colors.TEXT_PRIMARY,
  },
  emptySubheading: {
    marginTop: 8,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default ChatHistoryScreen;
