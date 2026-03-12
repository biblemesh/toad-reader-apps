import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import Datepicker from './Datepicker';

describe('Datepicker Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<Datepicker />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onSelect with the date and id/info when a date is selected', () => {
    const mockOnSelect = jest.fn();

    render(
      <Datepicker
        id="due-date"
        info={{ type: 'due' }}
        onSelect={mockOnSelect}
      />,
    );
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(new Date('2024-01-15'), {
      id: 'due-date',
      info: { type: 'due' },
    });
  });

  it('should not crash when onSelect is not provided', () => {
    render(<Datepicker />);
    expect(() => {
      fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));
    }).not.toThrow();
  });
});
