import React from 'react';

declare global {
  // eslint-disable-next-line no-var
  var __DEV__: boolean;
}

// Global test setup
global.__DEV__ = true;

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  jest.requireActual(
    '@react-native-async-storage/async-storage/jest/async-storage-mock',
  ),
);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock Expo modules
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: { extra: {} },
  },
}));

jest.mock('expo-file-system', () => ({
  documentDirectory: 'file://test/',
}));

// Mock inline-i18n
jest.mock('inline-i18n', () => ({
  i18n: (key: string, params?: Record<string, string>) => {
    if (params) {
      let result = key;
      Object.keys(params).forEach((param) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
      return result;
    }
    return key;
  },
  getLocale: () => 'en',
}));

// Mock Sentry
jest.mock('@sentry/react-native', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}));

// Mock UI Kitten components
jest.mock('@ui-kitten/components', () => {
  const { TouchableOpacity, Text } = jest.requireActual('react-native');

  return {
    ApplicationProvider: ({ children }: { children: React.ReactNode }) =>
      children,
    Button: React.forwardRef(
      (
        {
          children,
          ...props
        }: { children: React.ReactNode; [key: string]: unknown },
        ref: React.Ref<unknown>,
      ) =>
        React.createElement(
          TouchableOpacity,
          { ...props, ref },
          typeof children === 'string'
            ? React.createElement(Text, null, children)
            : children,
        ),
    ),
  };
});
