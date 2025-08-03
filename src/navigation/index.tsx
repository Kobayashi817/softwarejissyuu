// src/navigation/index.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VocabStack from './VocabStack';
import QuizStack from './QuizStack';

export type RootTabParamList = {
  Vocab: undefined;
  Quiz: undefined;
};

// 方法①：ジェネリクスを外して定義
const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Vocab"
        component={VocabStack}
        options={{ title: '単語帳管理' }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizStack}
        options={{ title: 'クイズ' }}
      />
    </Tab.Navigator>
  );
}
