import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';

export const PUSH_TOKEN_KEY = `pushToken`;

const usePushToken = () => {
  const [pushToken, setPushToken] = useState();

  const refreshToken = async () => {
    if (Device.isDevice) {
      try {
        const storedToken = await AsyncStorage.getItem(PUSH_TOKEN_KEY);
        const finalToken = storedToken || 'none';
        setPushToken(finalToken);
      } catch (error) {
        console.error('usePushToken - Error:', error);
        setPushToken('none');
      }
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return { pushToken, refreshToken };
};

export default usePushToken;
