import { render } from '@testing-library/react-native';
import FAB from './FAB.web';

jest.mock('./Icon', () => () => null);

describe('FAB (web) Component', () => {
  it('should return null on non-web platform', () => {
    const { toJSON } = render(<FAB iconName="plus" onPress={jest.fn()} />);
    expect(toJSON()).toBeNull();
  });

  it('should return null when no props are provided', () => {
    const { toJSON } = render(<FAB />);
    expect(toJSON()).toBeNull();
  });
});
