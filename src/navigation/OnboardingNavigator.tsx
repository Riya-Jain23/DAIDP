import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import ChildProfileScreen from '../screens/onboarding/ChildProfileScreen';
import MedicalContextScreen from '../screens/onboarding/MedicalContextScreen';
import CompletionScreen from '../screens/onboarding/CompletionScreen';
import LinkGroceryScreen from '../screens/onboarding/LinkGroceryScreen';

const Stack = createNativeStackNavigator();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ChildProfile" component={ChildProfileScreen} />
      <Stack.Screen name="MedicalContext" component={MedicalContextScreen} />
      <Stack.Screen name="Completion" component={CompletionScreen} />
      <Stack.Screen name="LinkGrocery" component={LinkGroceryScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
