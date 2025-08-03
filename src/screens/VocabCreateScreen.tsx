// src/screens/VocabCreateScreen.tsx

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { VocabStackParamList } from '../navigation/VocabStack';
import { vocabService } from '../services/vocabService';
import { Vocab } from '../models';

// NavigationProp に WordRegister を含む型を指定
type VocabCreateNavProp = NativeStackNavigationProp<
  VocabStackParamList,
  'VocabCreate'
>;

type Props = {
  navigation: VocabCreateNavProp;
};

export default function VocabCreateScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');

  const handleSave = async () => {
    const name = title.trim();
    if (!name) {
      Alert.alert('エラー', '単語帳名を入力してください');
      return;
    }
    const newVocab: Vocab = {
      id: Date.now().toString(),
      title: name,
      wordCount: 0,
    };
    try {
      await vocabService.addVocab(newVocab);
      // 保存後、作成した単語帳 ID で単語登録画面へ移動
      navigation.replace('WordRegister', { vocabId: newVocab.id });
    } catch (e) {
      console.error(e);
      Alert.alert('保存エラー', '単語帳の作成に失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="新しい単語帳名を入力"
        value={title}
        onChangeText={setTitle}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="作成して単語を登録" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
});
