import { useState, useCallback, useEffect } from 'react';
import { vocabService } from '../services/vocabService';
import { Vocab } from '../models';

/**
 * 単語帳一覧の取得と再取得を行うフック
 */
export function useVocab() {
  const [vocabs, setVocabs] = useState<Vocab[]>([]);

  // データ取得関数を定義
  const reload = useCallback(() => {
    vocabService.getVocabs().then(setVocabs);
  }, []);

  // 初回マウント時に取得
  useEffect(() => {
    reload();
  }, [reload]);

  return { vocabs, reload };
}
