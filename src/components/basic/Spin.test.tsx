import { render, screen } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import Spin from './Spin';

jest.mock('react-native-circular-progress', () => ({
  AnimatedCircularProgress: jest.fn(() => null),
}));
jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));

describe('Spin Component', () => {
  it('should render an ActivityIndicator when no percentage is provided', () => {
    render(<Spin />);
    expect(screen.UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });

  it('should not render an ActivityIndicator when a percentage is provided', () => {
    render(<Spin percentage={50} />);
    expect(screen.UNSAFE_queryByType(ActivityIndicator)).toBeNull();
  });

  it('should render without crashing with percentage 100', () => {
    const { toJSON } = render(<Spin percentage={100} />);
    expect(toJSON()).not.toBeNull();
  });
});
