import { render } from '@testing-library/react-native';
import AudiobookPlayerProgressBar, {
  getTimeStringFromMS,
} from './AudiobookPlayerProgressBar';

jest.mock('@react-native-community/hooks', () => ({
  useLayout: () => ({ onLayout: jest.fn(), width: 300 }),
}));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);

const defaultProps = {
  loading: false,
  positionMS: 30000,
  durationMS: 120000,
  setPosition: jest.fn(),
  getPlaying: () => false,
  pause: jest.fn(),
  play: jest.fn(),
  setScanIconToShow: jest.fn(),
};

describe('AudiobookPlayerProgressBar Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<AudiobookPlayerProgressBar {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render loading state', () => {
    expect(() =>
      render(<AudiobookPlayerProgressBar {...defaultProps} loading={true} />),
    ).not.toThrow();
  });

  it('should render with zero duration', () => {
    expect(() =>
      render(
        <AudiobookPlayerProgressBar
          {...defaultProps}
          positionMS={0}
          durationMS={0}
        />,
      ),
    ).not.toThrow();
  });
});

describe('getTimeStringFromMS', () => {
  it('should format 0ms as 0:00', () => {
    expect(getTimeStringFromMS(0)).toBe('0:00');
  });

  it('should format 60000ms as 1:00', () => {
    expect(getTimeStringFromMS(60000)).toBe('1:00');
  });

  it('should format 90500ms as 1:30', () => {
    expect(getTimeStringFromMS(90500)).toBe('1:30');
  });

  it('should format 5000ms as 0:05', () => {
    expect(getTimeStringFromMS(5000)).toBe('0:05');
  });
});
