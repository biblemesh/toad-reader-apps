import { render } from '@testing-library/react-native';
import { Animated } from 'react-native';
import ProgressDotLabel from './ProgressDotLabel';
import ProgressDot from './ProgressDot';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: { extra: { PROGRESS_BAR_SIDE_SPACING: 20 } },
  },
}));
jest.mock('./ProgressDotLabel', () => jest.fn(() => null));
jest.mock('../../utils/toolbox', () => ({ getFooterHeight: () => 40 }));
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 375 },
}));

const defaultProps = {
  size: 12,
  animatedScrollPosition: new Animated.Value(0),
  maxScroll: 1000,
  capturingSnapshots: false,
};

describe('ProgressDot Component', () => {
  beforeEach(() => {
    jest.mocked(ProgressDotLabel).mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ProgressDot {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render ProgressDotLabel when not capturing snapshots', () => {
    render(<ProgressDot {...defaultProps} capturingSnapshots={false} />);
    expect(jest.mocked(ProgressDotLabel).mock.calls.length).toBeGreaterThan(0);
  });

  it('should not render ProgressDotLabel when capturing snapshots', () => {
    render(<ProgressDot {...defaultProps} capturingSnapshots={true} />);
    expect(jest.mocked(ProgressDotLabel).mock.calls.length).toBe(0);
  });
});
