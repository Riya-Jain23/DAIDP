import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SectionHeader} from '../../components/layout';
import {useAppStore, useChatStore} from '../../store';
import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Shadows,
  Spacing,
} from '../../theme';

interface NotificationsScreenProps {
  navigation: any;
}

type NotificationType = 'followup' | 'alert' | 'win' | 'suggestion' | 'milestone';

interface NotificationItem {
  id: string;
  section: 'today' | 'this_week';
  type: NotificationType;
  icon: string;
  title: string;
  body: string;
  timestamp: string;
  defaultRead?: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'follow-up-dal',
    section: 'today',
    type: 'followup',
    icon: '🌱',
    title: 'Follow-up: Dal paratha',
    body: 'You tried dal paratha on Tuesday. How did it go?',
    timestamp: '2 hours ago',
  },
  {
    id: 'iron-gap',
    section: 'today',
    type: 'alert',
    icon: '🩸',
    title: 'Iron gap this week',
    body: "Arjun hasn't had chole in 5 days. His iron intake may be low.",
    timestamp: '5 hours ago',
  },
  {
    id: 'weekly-win',
    section: 'this_week',
    type: 'win',
    icon: '🏆',
    title: 'Weekly win — Arjun',
    body: "This week Arjun accepted 2 new foods. He's now at 12 accepted foods.",
    timestamp: 'Monday',
    defaultRead: true,
  },
  {
    id: 'new-suggestion',
    section: 'this_week',
    type: 'suggestion',
    icon: '💡',
    title: 'New suggestion ready',
    body: "Poshan has an idea for getting more protein into Arjun's tiffin.",
    timestamp: 'Sunday',
    defaultRead: true,
  },
  {
    id: 'acceptance-milestone',
    section: 'this_week',
    type: 'milestone',
    icon: '✨',
    title: 'Milestone reached',
    body: 'Arjun now eats 12 foods. Poshan has updated the next milestone.',
    timestamp: 'Sunday',
  },
];

const TYPE_COLORS: Record<NotificationType, string> = {
  followup: Colors.PRIMARY,
  alert: Colors.ERROR,
  win: Colors.AMBER,
  suggestion: Colors.PRIMARY,
  milestone: Colors.ACCENT,
};

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const notificationsRead = useAppStore((s) => s.notificationsRead);
  const markNotificationRead = useAppStore((s) => s.markNotificationRead);
  const markAllNotificationsRead = useAppStore((s) => s.markAllNotificationsRead);
  const setComposerDraft = useChatStore((s) => s.setComposerDraft);

  const handleNotificationAction = (notificationId: string, action: string) => {
    markNotificationRead(notificationId);

    if (notificationId === 'follow-up-dal') {
      navigation.navigate('LogMeal', {
        prefillFood: 'Dal Paratha',
        prefillOutcome: action === 'worked' ? 'ate_all' : 'refused',
        prefillNote:
          action === 'worked'
            ? 'Accepted after hiding dal in the dough.'
            : 'Refused after noticing the smell.',
      });
      return;
    }

    if (notificationId === 'iron-gap') {
      navigation.navigate('Main', {
        screen: 'Chat',
        params: {
          screen: 'NutritionScout',
        },
      });
      return;
    }

    if (notificationId === 'weekly-win') {
      navigation.navigate('WeeklyReport');
      return;
    }

    if (notificationId === 'new-suggestion') {
      setComposerDraft("What's the new protein idea for Arjun's tiffin?");
      navigation.navigate('Main', {screen: 'Chat'});
      return;
    }

    if (notificationId === 'acceptance-milestone') {
      navigation.navigate('Milestone', {
        childName: 'Arjun',
        milestoneType: 'acceptance',
        foodCount: 12,
      });
    }
  };

  const renderActionRow = (notification: NotificationItem) => {
    if (notification.id === 'follow-up-dal') {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionPill, styles.actionPillSuccess]}
            onPress={() => handleNotificationAction(notification.id, 'worked')}>
            <Text style={[styles.actionPillText, styles.actionPillTextSuccess]}>
              It worked ✓
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionPill, styles.actionPillDanger]}
            onPress={() => handleNotificationAction(notification.id, 'refused')}>
            <Text style={[styles.actionPillText, styles.actionPillTextDanger]}>
              He refused
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (notification.id === 'iron-gap') {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionPill, styles.actionPillOutline]}
            onPress={() => handleNotificationAction(notification.id, 'open')}>
            <Text style={[styles.actionPillText, styles.actionPillTextOutline]}>
              See iron plan →
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (notification.id === 'new-suggestion') {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionPill, styles.actionPillOutline]}
            onPress={() => handleNotificationAction(notification.id, 'open')}>
            <Text style={[styles.actionPillText, styles.actionPillTextOutline]}>
              See suggestion →
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (notification.id === 'acceptance-milestone') {
      return (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionPill, styles.actionPillOutline]}
            onPress={() => handleNotificationAction(notification.id, 'open')}>
            <Text style={[styles.actionPillText, styles.actionPillTextOutline]}>
              Celebrate →
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  const renderNotification = (notification: NotificationItem) => {
    const isRead = notification.defaultRead || notificationsRead.includes(notification.id);

    return (
      <TouchableOpacity
        key={notification.id}
        style={[
          styles.notificationCard,
          isRead ? styles.notificationCardRead : Shadows.card,
          !isRead && {
            borderLeftWidth: 3,
            borderLeftColor: TYPE_COLORS[notification.type],
          },
        ]}
        onPress={() => handleNotificationAction(notification.id, 'open')}
        activeOpacity={0.88}>
        <View style={styles.notificationTopRow}>
          <View style={styles.notificationTitleWrap}>
            <Text style={styles.notificationIcon}>{notification.icon}</Text>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
          </View>
          <Text style={styles.notificationTime}>{notification.timestamp}</Text>
        </View>
        <Text style={styles.notificationBody}>{notification.body}</Text>
        {renderActionRow(notification)}
      </TouchableOpacity>
    );
  };

  const todayNotifications = NOTIFICATIONS.filter(
    (notification) => notification.section === 'today',
  );
  const weekNotifications = NOTIFICATIONS.filter(
    (notification) => notification.section === 'this_week',
  );

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
        <Text style={styles.topBarTitle}>Notifications</Text>
        <TouchableOpacity
          onPress={() => markAllNotificationsRead(NOTIFICATIONS.map((item) => item.id))}>
          <Text style={styles.markAllText}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {todayNotifications.length === 0 && weekNotifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔔</Text>
            <Text style={styles.emptyHeading}>All caught up</Text>
            <Text style={styles.emptySubheading}>
              Poshan will nudge you when something needs attention.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <SectionHeader label="Today" variant="eyebrow" />
              {todayNotifications.map(renderNotification)}
            </View>

            <View style={styles.section}>
              <SectionHeader label="This week" variant="eyebrow" />
              {weekNotifications.map(renderNotification)}
            </View>
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
  topBarTitle: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: 17,
    color: Colors.TEXT_PRIMARY,
  },
  markAllText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.PRIMARY,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  section: {
    marginTop: Spacing.xl,
  },
  notificationCard: {
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.SURFACE,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationCardRead: {
    backgroundColor: Colors.BG,
  },
  notificationTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },
  notificationTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  notificationIcon: {
    fontSize: 16,
  },
  notificationTitle: {
    flex: 1,
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
    color: Colors.TEXT_PRIMARY,
  },
  notificationTime: {
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.xs,
    color: Colors.TEXT_MUTED,
  },
  notificationBody: {
    marginTop: 6,
    fontFamily: FontFamily.BODY,
    fontSize: FontSize.sm,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 18,
  },
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: 8,
  },
  actionPill: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  actionPillSuccess: {
    backgroundColor: Colors.AI_BUBBLE,
  },
  actionPillDanger: {
    backgroundColor: Colors.ERROR_LIGHT,
  },
  actionPillOutline: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  actionPillText: {
    fontFamily: FontFamily.BODY_SEMIBOLD,
    fontSize: FontSize.sm,
  },
  actionPillTextSuccess: {
    color: Colors.PRIMARY,
  },
  actionPillTextDanger: {
    color: '#991B1B',
  },
  actionPillTextOutline: {
    color: Colors.PRIMARY,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyIcon: {
    fontSize: 40,
    color: '#D1D5DB',
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

export default NotificationsScreen;
