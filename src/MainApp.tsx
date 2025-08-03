import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation';

export default function MainApp() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
