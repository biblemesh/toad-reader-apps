import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import Select from './Select';

describe('Select Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<Select />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onSelect with id, info, and selectionInfo when selected', () => {
    const mockOnSelect = jest.fn();
    render(
      <Select id="sel-1" info={{ extra: true }} onSelect={mockOnSelect} />,
    );

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnSelect).toHaveBeenCalledWith({
      id: 'sel-1',
      info: { extra: true },
      row: 0,
    });
  });

  it('should not crash when onSelect is not provided', () => {
    render(<Select id="sel-1" />);
    expect(() =>
      fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity)),
    ).not.toThrow();
  });
});
