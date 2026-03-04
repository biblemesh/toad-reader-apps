import { render } from '@testing-library/react-native';
import CoverCheck from './CoverCheck';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

describe('CoverCheck Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<CoverCheck />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render a non-null element', () => {
    const { toJSON } = render(<CoverCheck />);
    expect(toJSON()).not.toBeNull();
  });
});
