import { render } from '@testing-library/react-native';
import PagesBookmark from './PagesBookmark';

jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));

describe('PagesBookmark Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<PagesBookmark />)).not.toThrow();
  });

  it('should be a function component', () => {
    expect(typeof PagesBookmark).toBe('function');
  });
});
