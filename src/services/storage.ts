// src/services/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async getItem(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  async setItem(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  },
};
