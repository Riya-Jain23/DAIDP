import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppStore} from '../store';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';
import LogMealScreen from '../screens/log/LogMealScreen';
import TiffinPlannerScreen from '../screens/planner/TiffinPlannerScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import WeeklyReportScreen from '../screens/profile/WeeklyReportScreen';
import DoctorReportScreen from '../screens/profile/DoctorReportScreen';
import ExploreScreen from '../screens/home/ExploreScreen';
import ArticleScreen from '../screens/article/ArticleScreen';
import MilestoneScreen from '../screens/modal/MilestoneScreen';

const RootStack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const onboardingComplete = useAppStore((s) => s.onboardingComplete);

  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      {!onboardingComplete ? (
        <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
      ) : (
        <>
          <RootStack.Screen name="Main" component={MainNavigator} />
          <RootStack.Screen
            name="LogMeal"
            component={LogMealScreen}
            options={{
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <RootStack.Screen
            name="Tiffin"
            component={TiffinPlannerScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen
            name="WeeklyReport"
            component={WeeklyReportScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen
            name="DoctorReport"
            component={DoctorReportScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen
            name="Explore"
            component={ExploreScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen
            name="Article"
            component={ArticleScreen}
            options={{
              animation: 'slide_from_right',
            }}
          />
          <RootStack.Screen
            name="Milestone"
            component={MilestoneScreen}
            options={{
              presentation: 'modal',
              animation: 'fade_from_bottom',
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default AppNavigator;
