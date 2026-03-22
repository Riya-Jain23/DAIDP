import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, FontFamily, FontSize, Spacing, Shadows} from '../../theme';

interface TabItem {
  name: string;
  label: string;
  icon: string;
  iconActive: string;
}

const TABS: TabItem[] = [
  {name: 'Home', label: 'Home', icon: '🏠', iconActive: '🏠'},
  {name: 'Chat', label: 'Chat', icon: '💬', iconActive: '💬'},
  {name: 'Progress', label: 'Progress', icon: '📊', iconActive: '📊'},
  {name: 'Profile', label: 'Profile', icon: '👤', iconActive: '👤'},
];

interface BottomTabBarProps {
  state: any;
  navigation: any;
  descriptors: any;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, Shadows.tabBar, {paddingBottom: Math.max(insets.bottom, 8)}]}>
      {TABS.map((tab, index) => {
        const isActive = state.index === index;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: state.routes[index]?.key,
                canPreventDefault: true,
              });
              if (!event.defaultPrevented) {
                navigation.navigate(state.routes[index]?.name);
              }
            }}
            activeOpacity={0.7}>
            <Text style={styles.tabIcon}>
              {isActive ? tab.iconActive : tab.icon}
            </Text>
            <Text
              style={[
                styles.tabLabel,
                {color: isActive ? Colors.PRIMARY : Colors.TEXT_MUTED},
              ]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.SURFACE,
    paddingTop: Spacing.sm,
    borderTopWidth: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xs,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
  },
  tabLabel: {
    fontFamily: FontFamily.BODY_MEDIUM,
    fontSize: FontSize.xs,
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,
    width: 20,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.PRIMARY,
  },
});

export default BottomTabBar;
