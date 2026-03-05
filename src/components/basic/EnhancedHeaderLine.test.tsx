import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import EnhancedHeaderLine from './EnhancedHeaderLine';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));

jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
  labelThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../basic/Icon', () => () => null);

describe('EnhancedHeaderLine Component', () => {
  it('should render label text when label is a string', () => {
    render(<EnhancedHeaderLine label="Chapter One" />);
    expect(screen.getByText('Chapter One')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<EnhancedHeaderLine label="Pressable Line" onPress={mockOnPress} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render without a TouchableOpacity when onPress is not provided', () => {
    render(<EnhancedHeaderLine label="Static Line" />);
    expect(screen.UNSAFE_queryByType(TouchableOpacity)).toBeNull();
  });
});
