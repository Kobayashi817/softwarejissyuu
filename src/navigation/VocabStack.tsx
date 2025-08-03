// src/navigation/VocabStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VocabListScreen from '../screens/VocabListScreen';
import VocabCreateScreen from '../screens/VocabCreateScreen';
import VocabEditScreen from '../screens/VocabEditScreen';
import WordRegisterScreen from '../screens/WordRegisterScreen';  // 追加

export type VocabStackParamList = {
  VocabList: undefined;
  VocabCreate: undefined;
  VocabEdit: { vocabId: string };
  WordRegister: { vocabId: string };   // ← ここを追加
};

const Stack = createNativeStackNavigator<VocabStackParamList>();

export default function VocabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="VocabList" component={VocabListScreen} options={{ title: '単語帳一覧' }} />
      <Stack.Screen name="VocabCreate" component={VocabCreateScreen} options={{ title: '単語帳を作成' }} />
      <Stack.Screen name="VocabEdit" component={VocabEditScreen} options={{ title: '単語帳詳細／編集' }} />
      <Stack.Screen 
        name="WordRegister" 
        component={WordRegisterScreen} 
        options={{ title: '単語を登録' }}
      />
    </Stack.Navigator>
  );
}
