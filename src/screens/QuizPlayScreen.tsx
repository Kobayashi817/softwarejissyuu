// src/screens/QuizPlayScreen.tsx

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useFocusEffect, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { QuizStackParamList } from '../navigation/QuizStack';
import { vocabService } from '../services/vocabService';
import type { Word } from '../models';

type Props = {
  route: RouteProp<QuizStackParamList, 'QuizPlay'>;
  navigation: NativeStackNavigationProp<QuizStackParamList, 'QuizPlay'>;
};

export default function QuizPlayScreen({ route, navigation }: Props) {
  const { vocabId } = route.params;
  const [words, setWords] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  // フォーカス時に単語一覧を取得
  useFocusEffect(
    useCallback(() => {
      vocabService.getWords(vocabId).then((ws) => {
        if (ws.length < 4) {
          Alert.alert('エラー', '単語が4語以上必要です');
          navigation.goBack();
        } else {
          setWords(ws);
          setIndex(0);
          setSelected(null);
        }
      });
    }, [vocabId, navigation])
  );

  // 現在の問題の単語
  const current = words[index];

  // 選択肢の生成（正答 + 同品詞のダミー3つ）
  const choices = useMemo(() => {
    if (!current) return [];
    const samePos = words.filter((w) => w.pos === current.pos && w.id !== current.id);
    // シャッフル helper
    const shuffle = <T,>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

    const dummies = shuffle(samePos).slice(0, 3).map((w) => w.meaning);
    const all = shuffle([current.meaning, ...dummies]);
    return all;
  }, [current, words]);

  if (!current) {
    return (
      <View style={styles.container}>
        <Text>問題がありません</Text>
      </View>
    );
  }

  const onSelect = (choice: string) => {
    setSelected(choice);
    setTimeout(() => {
      // 次の問題 or 終了
      if (index + 1 < words.length) {
        setIndex((i) => i + 1);
        setSelected(null);
      } else {
        Alert.alert('完了', 'クイズを終了しました', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{current.word}</Text>
      {choices.map((c) => {
        const isCorrect = c === current.meaning;
        const isSelected = c === selected;
        let background = '#fff';
        if (selected) {
          if (isSelected) background = isCorrect ? '#c8e6c9' : '#ffcdd2';
        }
        return (
          <TouchableOpacity
            key={c}
            style={[styles.choice, { backgroundColor: background }]}
            onPress={() => !selected && onSelect(c)}
          >
            <Text style={styles.choiceText}>{c}</Text>
          </TouchableOpacity>
        );
      })}
      <Text style={styles.progress}>
        {index + 1} / {words.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  question: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  choice: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginVertical: 6,
  },
  choiceText: { fontSize: 18 },
  progress: { textAlign: 'center', marginTop: 24, color: '#666' },
});
