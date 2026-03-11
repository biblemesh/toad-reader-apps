import { render } from '@testing-library/react-native';
import AudiobookPlayer from './AudiobookPlayer';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest
        .fn()
        .mockResolvedValue({
          sound: {
            setStatusAsync: jest.fn(),
            unloadAsync: jest.fn(),
            setRateAsync: jest.fn(),
          },
        }),
    },
    setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
  },
}));
jest.mock('react-use/lib/useUpdateEffect', () => jest.fn());
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 400 },
}));
jest.mock('../../hooks/useRefState', () => (initial: unknown) => [
  initial,
  jest.fn(),
  () => initial,
]);
jest.mock('../../hooks/useSetInterval', () => () => [jest.fn(), jest.fn()]);
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../utils/toolbox', () => ({
  getReqOptionsWithAdditions: (opts: unknown) => opts,
}));
jest.mock('./AudiobookPlayerChapterLine', () => () => null);
jest.mock('./AudiobookPlayerProgressBar', () => () => null);
jest.mock('./AudiobookPlayerButtonRow', () => () => null);

const defaultProps = {
  uriBase: 'https://test.example.com/',
  localSourceBase: 'file://test/',
  latestLocation: null,
  downloadProgressByFilename: {},
  toggleDownloaded: jest.fn(),
  updateLatestLocation: jest.fn(),
  cookie: 'test-cookie',
  goStartRecordReading: jest.fn(),
  endRecordReading: jest.fn(),
  audiobookInfo: { spines: [{ filename: 'chapter1.mp3', durationMS: 60000 }] },
  downloadStatus: 'downloaded',
};

describe('AudiobookPlayer Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<AudiobookPlayer {...defaultProps} />)).not.toThrow();
  });

  it('should render with empty spines', () => {
    expect(() =>
      render(
        <AudiobookPlayer {...defaultProps} audiobookInfo={{ spines: [] }} />,
      ),
    ).not.toThrow();
  });

  it('should render without cookie', () => {
    expect(() =>
      render(<AudiobookPlayer {...defaultProps} cookie={null} />),
    ).not.toThrow();
  });
});
