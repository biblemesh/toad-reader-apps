import { useEffect } from "react"
import { Platform } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from "expo-notifications"
import * as Device from 'expo-device'
import Constants from 'expo-constants'

import usePushToken, { PUSH_TOKEN_KEY } from './usePushToken'

const usePushNotificationsSetup = () => {

  const { pushToken, refreshToken } = usePushToken()

  useEffect(
    () => {
      if(Device.isDevice && Platform.OS !== 'web') {
        
        (async () => {
          try {
            if(pushToken === "none") {
              // Set up Android notification channel
              if(Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                  name: 'default',
                  sound: 'default',
                  importance: Notifications.AndroidImportance.MAX,
                  vibrationPattern: [0, 250, 250, 250],
                });
              }

              // Check permissions
              const { status: existingStatus } = await Notifications.getPermissionsAsync()
              let finalStatus = existingStatus

              if(existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
              }

              // Handle iOS provisional status and Android granted status
              if(finalStatus !== 'granted' && finalStatus !== 'provisional') {
                console.warn(`Push notifications setup failed: Permissions not granted (${finalStatus})`);
                return;
              }

              const tokenResult = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
              });
              const { data } = tokenResult;
              
              await AsyncStorage.setItem(PUSH_TOKEN_KEY, data);
              await refreshToken(); // Update UI immediately

            }
          } catch (error) {
            console.error('Push notifications setup failed:', {
              message: error?.message,
              code: error?.code,
              name: error?.name,
              stack: error?.stack
            });
          }
        })();
      }
    },
    [ pushToken ],
  )

}

export default usePushNotificationsSetup
