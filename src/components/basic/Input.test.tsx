import { render, fireEvent, screen } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import Input from './Input';

describe('Input Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<Input />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    render(<Input onChangeText={mockOnChangeText} />);

    fireEvent.changeText(screen.UNSAFE_getByType(TextInput), 'hello');

    expect(mockOnChangeText).toHaveBeenCalledWith('hello');
  });

  it('should call onChangeInfo with id, value, and info when text changes', () => {
    const mockOnChangeInfo = jest.fn();
    render(
      <Input
        id="field-1"
        info={{ extra: true }}
        onChangeInfo={mockOnChangeInfo}
      />,
    );

    fireEvent.changeText(screen.UNSAFE_getByType(TextInput), 'world');

    expect(mockOnChangeInfo).toHaveBeenCalledWith({
      id: 'field-1',
      value: 'world',
      info: { extra: true },
    });
  });
});
