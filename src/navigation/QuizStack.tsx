// src/navigation/QuizStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizSelectScreen from '../screens/QuizSelectScreen';
import QuizPlayScreen from '../screens/QuizPlayScreen';

export type QuizStackParamList = {
  QuizSelect: undefined;
  QuizPlay: { vocabId: string };
};

const Stack = createNativeStackNavigator<QuizStackParamList>();

export default function QuizStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuizSelect"
        component={QuizSelectScreen}
        options={{ title: 'クイズ対象選択' }}
      />
      <Stack.Screen
        name="QuizPlay"
        component={QuizPlayScreen}
        options={{ title: 'クイズ' }}
      />
    </Stack.Navigator>
  );
}
