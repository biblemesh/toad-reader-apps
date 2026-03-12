import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import ColorSwitcher, { isDark } from './ColorSwitcher';

jest.mock('../../hooks/useNonBlurringOnPress', () => (callback) => ({
  onPress: callback,
}));
jest.mock('./Icon', () => () => null);

describe('ColorSwitcher Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<ColorSwitcher color={1} update={jest.fn()} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call update with the next color when pressed', () => {
    const mockUpdate = jest.fn();
    render(<ColorSwitcher color={1} update={mockUpdate} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockUpdate).toHaveBeenCalledWith(2);
  });

  it('should wrap around to color 1 when pressed at the last color', () => {
    const mockUpdate = jest.fn();
    render(<ColorSwitcher color={3} update={mockUpdate} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockUpdate).toHaveBeenCalledWith(1);
  });
});

describe('isDark utility', () => {
  it('should return true for dark colors', () => {
    expect(isDark('#000000')).toBe(true);
    expect(isDark('#333333')).toBe(true);
  });

  it('should return false for light colors', () => {
    expect(isDark('#ffffff')).toBe(false);
    expect(isDark('#cccccc')).toBe(false);
  });
});
