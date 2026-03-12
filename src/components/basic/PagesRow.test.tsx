import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import PagesRow from './PagesRow';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      extra: { PAGES_VERTICAL_MARGIN: 20, PAGES_HORIZONTAL_MARGIN: 20 },
    },
  },
}));

describe('PagesRow Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<PagesRow />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render its children', () => {
    render(
      <PagesRow>
        <Text>Page 1</Text>
        <Text>Page 2</Text>
      </PagesRow>,
    );
    expect(screen.getByText('Page 1')).toBeTruthy();
    expect(screen.getByText('Page 2')).toBeTruthy();
  });
});
