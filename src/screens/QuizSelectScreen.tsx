// src/screens/QuizSelectScreen.tsx

import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { QuizStackParamList } from '../navigation/QuizStack';
import { useVocab } from '../hooks/useVocab';

type QuizSelectNavProp = NativeStackNavigationProp<
  QuizStackParamList,
  'QuizSelect'
>;

export default function QuizSelectScreen() {
  const navigation = useNavigation<QuizSelectNavProp>();
  const { vocabs, reload } = useVocab();

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vocabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('QuizPlay', { vocabId: item.id })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.count}>{item.wordCount} 語</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>単語帳がありません</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  count: { marginTop: 4, color: '#666' },
  empty: { textAlign: 'center', marginTop: 32, color: '#999' },
});
