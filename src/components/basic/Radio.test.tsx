import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import Radio from './Radio';

describe('Radio Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<Radio />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onChange with id, value, and info when changed', () => {
    const mockOnChange = jest.fn();
    render(<Radio id="opt-1" info={{ extra: true }} onChange={mockOnChange} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnChange).toHaveBeenCalledWith({
      id: 'opt-1',
      value: true,
      info: { extra: true },
    });
  });

  it('should not crash when onChange is not provided', () => {
    render(<Radio id="opt-1" />);
    expect(() =>
      fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity)),
    ).not.toThrow();
  });
});
