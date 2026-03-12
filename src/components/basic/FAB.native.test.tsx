import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import FAB from './FAB.native';

jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
}));
jest.mock('./Icon', () => () => null);

describe('FAB (native) Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<FAB iconName="plus" onPress={jest.fn()} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<FAB iconName="plus" onPress={mockOnPress} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render without crashing when no onPress is provided', () => {
    const { toJSON } = render(<FAB iconName="plus" />);
    expect(toJSON()).not.toBeNull();
  });
});
