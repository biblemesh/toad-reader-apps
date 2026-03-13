import { Animated } from 'react-native';
import { render } from '@testing-library/react-native';
import BookProgress from './BookProgress';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 400 },
}));
jest.mock('../../utils/toolbox', () => ({ getFooterHeight: () => 50 }));
jest.mock('../basic/ProgressDot', () => () => null);

const defaultProps = {
  scrollToPercentage: jest.fn(),
  animatedScrollPosition: new Animated.Value(0),
  maxScroll: 500,
  capturingSnapshots: false,
};

describe('BookProgress Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<BookProgress {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render with zero maxScroll', () => {
    expect(() =>
      render(<BookProgress {...defaultProps} maxScroll={0} />),
    ).not.toThrow();
  });

  it('should render while capturing snapshots', () => {
    expect(() =>
      render(<BookProgress {...defaultProps} capturingSnapshots={true} />),
    ).not.toThrow();
  });
});
