import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import KeyboardAvoidingView from './KeyboardAvoidingView';

jest.mock('expo-screen-orientation', () => ({
  addOrientationChangeListener: jest.fn(() => ({})),
  removeOrientationChangeListener: jest.fn(),
  OrientationLock: { PORTRAIT_UP: 'PORTRAIT_UP' },
}));
jest.mock('react-use/lib/useCounter', () => () => [0, { inc: jest.fn() }]);
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../utils/toolbox', () => ({
  getStatusBarCurrentHeight: () => 0,
}));

describe('KeyboardAvoidingView Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<KeyboardAvoidingView />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render its children', () => {
    render(
      <KeyboardAvoidingView>
        <Text>Child content</Text>
      </KeyboardAvoidingView>,
    );
    expect(screen.getByText('Child content')).toBeTruthy();
  });

  it('should render without crashing when a style prop is provided', () => {
    const { toJSON } = render(
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Text>Content</Text>
      </KeyboardAvoidingView>,
    );
    expect(toJSON()).not.toBeNull();
  });
});
