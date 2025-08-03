// App.tsx

// ① 必ず最上部で react-native-gesture-handler をインポート
import 'react-native-gesture-handler';

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation';

export default function App() {
  return (
    // ② アプリ全体を GestureHandlerRootView でラップ
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
