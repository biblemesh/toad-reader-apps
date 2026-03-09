import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import RadioGroup from './RadioGroup';

describe('RadioGroup Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<RadioGroup />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onChange with id, index, and info when changed', () => {
    const mockOnChange = jest.fn();
    render(
      <RadioGroup
        id="group-1"
        info={{ extra: true }}
        onChange={mockOnChange}
      />,
    );

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnChange).toHaveBeenCalledWith({
      id: 'group-1',
      index: 0,
      info: { extra: true },
    });
  });

  it('should not crash when onChange is not provided', () => {
    render(<RadioGroup id="group-1" />);
    expect(() =>
      fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity)),
    ).not.toThrow();
  });
});
