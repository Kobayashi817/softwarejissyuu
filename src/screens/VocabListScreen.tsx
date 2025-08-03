import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Swipeable } from 'react-native-gesture-handler';
import type { VocabStackParamList } from '../navigation/VocabStack';
import { useVocab } from '../hooks/useVocab';
import { vocabService } from '../services/vocabService';

type VocabListNavProp = NativeStackNavigationProp<
  VocabStackParamList,
  'VocabList'
>;

export default function VocabListScreen() {
  const navigation = useNavigation<VocabListNavProp>();
  const { vocabs, reload } = useVocab();

  useFocusEffect(
    React.useCallback(() => {
      reload();
    }, [reload])
  );

  const renderRightActions = (
    id: string
  ) => (
    <View style={styles.rightAction}>
      <Button
        title="削除"
        color="#fff"
        onPress={() =>
          Alert.alert('確認', 'この単語帳を削除しますか？', [
            { text: 'キャンセル', style: 'cancel' },
            {
              text: 'OK',
              onPress: async () => {
                await vocabService.deleteVocab(id);
                reload();
              },
            },
          ])
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vocabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={() =>
              renderRightActions(item.id)
            }
          >
            <View style={styles.card}>
              <Text
                style={styles.title}
                onPress={() =>
                  navigation.navigate('VocabEdit', {
                    vocabId: item.id,
                  })
                }
              >
                {item.title}
              </Text>
              <Text style={styles.count}>
                {item.wordCount} 語
              </Text>
            </View>
          </Swipeable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            単語帳がありません
          </Text>
        }
      />
      <Button
        title="＋ 単語帳を作成"
        onPress={() =>
          navigation.navigate('VocabCreate')
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  count: { marginTop: 4, color: '#666' },
  empty: { textAlign: 'center', marginTop: 32, color: '#999' },
  rightAction: {
    justifyContent: 'center',
    backgroundColor: '#f00',
    width: 80,
    alignItems: 'center',
  },
});
