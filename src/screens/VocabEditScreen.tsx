import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {
  useFocusEffect,
  RouteProp,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Swipeable } from 'react-native-gesture-handler';
import { vocabService } from '../services/vocabService';
import type { VocabStackParamList } from '../navigation/VocabStack';
import type { Word } from '../models';

type Props = {
  route: RouteProp<VocabStackParamList, 'VocabEdit'>;
  navigation: NativeStackNavigationProp<
    VocabStackParamList,
    'VocabEdit'
  >;
};

export default function VocabEditScreen({
  route,
  navigation,
}: Props) {
  const { vocabId } = route.params;
  const [words, setWords] = useState<Word[]>([]);

  useFocusEffect(
    useCallback(() => {
      vocabService
        .getWords(vocabId)
        .then(setWords);
    }, [vocabId])
  );

  const renderRightActions = (
    wordId: string
  ) => (
    <View style={styles.rightAction}>
      <Button
        title="削除"
        color="#fff"
        onPress={() =>
          Alert.alert('確認', 'この単語を削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            {
              text: 'OK',
              onPress: async () => {
                await vocabService.deleteWord(
                  vocabId,
                  wordId
                );
                const updated = await vocabService.getWords(
                  vocabId
                );
                setWords(updated);
              },
            },
          ])
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="＋ 単語を登録"
        onPress={() =>
          navigation.navigate('WordRegister', {
            vocabId,
          })
        }
      />
      <FlatList
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() =>
              renderRightActions(item.id)
            }
          >
            <View style={styles.card}>
              <Text style={styles.word}>
                {item.word}
              </Text>
              <Text>
                {item.meaning}（{item.pos}）
              </Text>
            </View>
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            単語がありません
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
  },
  word: { fontSize: 16, fontWeight: 'bold' },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    color: '#999',
  },
  rightAction: {
    justifyContent: 'center',
    backgroundColor: '#f00',
    width: 80,
    alignItems: 'center',
  },
});
