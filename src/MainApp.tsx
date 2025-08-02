import 'react-native-reanimated'; // ← 最上部に！
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

export default function MainApp() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
