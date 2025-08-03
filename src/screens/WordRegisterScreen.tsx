// src/screens/WordRegisterScreen.tsx

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { vocabService } from '../services/vocabService';
import type { VocabStackParamList } from '../navigation/VocabStack';
import type { Word } from '../models';

type Props = {
  route: RouteProp<VocabStackParamList, 'WordRegister'>;
  navigation: NativeStackNavigationProp<VocabStackParamList, 'WordRegister'>;
};

const PARTS_OF_SPEECH = ['名詞', '動詞', '形容詞', '副詞'];

export default function WordRegisterScreen({ route, navigation }: Props) {
  const { vocabId } = route.params;
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [pos, setPos] = useState(PARTS_OF_SPEECH[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = async () => {
    if (!word.trim() || !meaning.trim()) {
      Alert.alert('エラー', '単語と意味を入力してください');
      return;
    }
    try {
      await vocabService.addWord(vocabId, {
        id: Date.now().toString(),
        vocabId,
        word: word.trim(),
        meaning: meaning.trim(),
        pos,
      });
      navigation.goBack();
    } catch (e) {
      console.error(e);
      Alert.alert('保存エラー', '単語の登録に失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>単語</Text>
      <TextInput
        style={styles.input}
        value={word}
        onChangeText={setWord}
        placeholder="単語を入力してください"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>意味</Text>
      <TextInput
        style={styles.input}
        value={meaning}
        onChangeText={setMeaning}
        placeholder="単語の意味を入力してください"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>品詞</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{pos}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={PARTS_OF_SPEECH}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setPos(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ← ここが「登録」ボタンです */}
      <Button title="登録" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  dropdownText: { fontSize: 16 },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 32,
    borderRadius: 8,
    paddingVertical: 8,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalItemText: { fontSize: 16 },
});
