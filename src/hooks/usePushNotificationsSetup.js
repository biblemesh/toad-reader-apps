import { useEffect } from "react"
import { Platform } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from "expo-notifications"
import * as Device from 'expo-device'
import Constants from 'expo-constants'

import usePushToken, { PUSH_TOKEN_KEY } from './usePushToken'

const usePushNotificationsSetup = () => {

  const pushToken = usePushToken()

  useEffect(
    () => {
      if(Device.isDevice && Platform.OS !== 'web') {
        
        (async () => {
          try {
            if(pushToken === "none") {
              const { status: existingStatus } = await Notifications.getPermissionsAsync()
              let finalStatus = existingStatus

              if(existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
              }

              if(finalStatus !== 'granted') {
                return;
              }

              const projectId = Constants.expoConfig?.extra?.eas?.projectId;
              const tokenResult = await Notifications.getExpoPushTokenAsync(
                projectId ? { projectId } : undefined
              );
              const { data } = tokenResult;
              
              await AsyncStorage.setItem(PUSH_TOKEN_KEY, data);

              if(Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                  name: 'default',
                  sound: 'default',
                  importance: Notifications.AndroidImportance.MAX,
                  vibrationPattern: [0, 250, 250, 250],
                });
              }

            }
          } catch (error) {
            console.error('Push setup - Error message:', error.message);
          }
        })();
      }
    },
    [ pushToken ],
  )

}

export default usePushNotificationsSetup
