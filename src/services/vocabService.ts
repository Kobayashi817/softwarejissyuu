// src/services/vocabService.ts

import { storage } from './storage';
import type { Vocab, Word } from '../models';

const VOCAB_KEY = 'vocabs';
const WORD_KEY_PREFIX = 'words_';

export const vocabService = {
  async getVocabs(): Promise<Vocab[]> {
    return (await storage.getItem(VOCAB_KEY)) || [];
  },
  async addVocab(vocab: Vocab) {
    const list = await this.getVocabs();
    await storage.setItem(VOCAB_KEY, [...list, vocab]);
  },
  /** 単語帳を削除 */
  async deleteVocab(vocabId: string) {
    const list = await this.getVocabs();
    const filtered = list.filter((v) => v.id !== vocabId);
    await storage.setItem(VOCAB_KEY, filtered);
    // 単語データも削除
    await storage.setItem(WORD_KEY_PREFIX + vocabId, []);
  },

  async getWords(vocabId: string): Promise<Word[]> {
    return (await storage.getItem(WORD_KEY_PREFIX + vocabId)) || [];
  },
  async addWord(vocabId: string, word: Word) {
    const list = await this.getWords(vocabId);
    await storage.setItem(WORD_KEY_PREFIX + vocabId, [...list, word]);
  },
  /** 個別の単語を削除 */
  async deleteWord(vocabId: string, wordId: string) {
    const list = await this.getWords(vocabId);
    const filtered = list.filter((w) => w.id !== wordId);
    await storage.setItem(WORD_KEY_PREFIX + vocabId, filtered);
  },
};
