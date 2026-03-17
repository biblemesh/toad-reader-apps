import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Guide from './Guide';

jest.mock('expo-blur', () => ({
  BlurView: ({ children }: { children: unknown }) => children,
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../utils/toolbox', () => ({
  getStatusBarCurrentHeight: () => 0,
}));
jest.mock('../basic/Button', () => {
  const { TouchableOpacity, Text: RNText } = jest.requireActual('react-native');
  return ({ children, onPress }: { children: unknown; onPress: unknown }) => (
    <TouchableOpacity onPress={onPress as () => void}>
      <RNText>{children}</RNText>
    </TouchableOpacity>
  );
});
jest.mock('../basic/Icon', () => () => null);

const defaultProps = {
  ready: false,
  markComplete: jest.fn(),
  children: <Text>Guide content</Text>,
};

describe('Guide Component', () => {
  it('should return null when not ready and not blocking', () => {
    const { toJSON } = render(<Guide {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render when blockUntilReady is true (even before ready)', () => {
    expect(() =>
      render(<Guide {...defaultProps} blockUntilReady={true} />),
    ).not.toThrow();
  });

  it('should render when ready is true', () => {
    expect(() =>
      render(<Guide {...defaultProps} ready={true} />),
    ).not.toThrow();
  });
});
