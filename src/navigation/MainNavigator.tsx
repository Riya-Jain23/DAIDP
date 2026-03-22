import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomTabBar} from '../components/navigation';
import HomeScreen from '../screens/home/HomeScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import NutritionScoutScreen from '../screens/nutrition/NutritionScoutScreen';
import ChatHistoryScreen from '../screens/chat/ChatHistoryScreen';
import RecipeScreen from '../screens/chat/RecipeScreen';
import FoodDetailScreen from '../screens/progress/FoodDetailScreen';

const Tab = createBottomTabNavigator();
const ChatStack = createNativeStackNavigator();
const ProgressStack = createNativeStackNavigator();

const ChatNavigator: React.FC = () => (
  <ChatStack.Navigator screenOptions={{headerShown: false}}>
    <ChatStack.Screen name="ChatMain" component={ChatScreen} />
    <ChatStack.Screen name="NutritionScout" component={NutritionScoutScreen} />
    <ChatStack.Screen name="ChatHistory" component={ChatHistoryScreen} />
    <ChatStack.Screen name="Recipe" component={RecipeScreen} />
  </ChatStack.Navigator>
);

const ProgressNavigator: React.FC = () => (
  <ProgressStack.Navigator screenOptions={{headerShown: false}}>
    <ProgressStack.Screen name="ProgressMain" component={ProgressScreen} />
    <ProgressStack.Screen name="FoodDetail" component={FoodDetailScreen} />
  </ProgressStack.Navigator>
);

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Progress" component={ProgressNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
