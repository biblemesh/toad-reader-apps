import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import CoversRow from './CoversRow';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: { extra: {} },
  },
}));

describe('CoversRow Component', () => {
  it('should render children', () => {
    render(
      <CoversRow>
        <Text>Book Cover</Text>
      </CoversRow>,
    );
    expect(screen.getByText('Book Cover')).toBeTruthy();
  });

  it('should render without crashing when no children are provided', () => {
    const { toJSON } = render(<CoversRow />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render children when isFirstRow is true', () => {
    render(
      <CoversRow isFirstRow>
        <Text>First Row Book</Text>
      </CoversRow>,
    );
    expect(screen.getByText('First Row Book')).toBeTruthy();
  });
});
