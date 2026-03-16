export {};

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
// Handles all calling conventions: i18n(key), i18n(key, params),
// i18n(key, namespace, params), i18n(key, default, namespace, params)
jest.mock('inline-i18n', () => ({
  i18n: (...args: unknown[]) => {
    const key = args[0] as string;
    const lastArg = args[args.length - 1];
    const params =
      typeof lastArg === 'object' && lastArg !== null
        ? (lastArg as Record<string, string>)
        : undefined;
    if (params) {
      return Object.keys(params).reduce((result, param) => {
        return result.replace(
          new RegExp(`{{${param}}}`, 'g'),
          String(params[param]),
        );
      }, key);
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

// Mock UI Kitten components — manual mock lives in __mocks__/@ui-kitten/components.tsx
jest.mock('@ui-kitten/components');
