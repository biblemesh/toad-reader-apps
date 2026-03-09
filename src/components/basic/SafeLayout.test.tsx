import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import SafeLayout from './SafeLayout';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 20, bottom: 0, left: 0, right: 0 }),
}));

describe('SafeLayout Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<SafeLayout />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render its children', () => {
    render(
      <SafeLayout>
        <Text>Safe content</Text>
      </SafeLayout>,
    );
    expect(screen.getByText('Safe content')).toBeTruthy();
  });

  it('should render without crashing when no children are provided', () => {
    expect(() => render(<SafeLayout />)).not.toThrow();
  });
});
