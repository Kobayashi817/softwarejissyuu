export type Vocab = {
  id: string;
  title: string;
  wordCount: number;
};

export type Word = {
  id: string;
  vocabId: string;
  word: string;
  meaning: string;
  pos: string;
};
