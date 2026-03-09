import { render, fireEvent, screen } from '@testing-library/react-native';
import { TextInput as RNTextInput } from 'react-native';
import TextInput from './TextInput';

describe('TextInput Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<TextInput />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onChangeText when text changes', () => {
    const mockOnChangeText = jest.fn();
    render(<TextInput onChangeText={mockOnChangeText} />);

    fireEvent.changeText(screen.UNSAFE_getByType(RNTextInput), 'hello');

    expect(mockOnChangeText).toHaveBeenCalledWith('hello');
  });

  it('should call onChangeInfo with id, value, and info when text changes', () => {
    const mockOnChangeInfo = jest.fn();
    render(
      <TextInput
        id="field-1"
        info={{ extra: true }}
        onChangeInfo={mockOnChangeInfo}
      />,
    );

    fireEvent.changeText(screen.UNSAFE_getByType(RNTextInput), 'world');

    expect(mockOnChangeInfo).toHaveBeenCalledWith({
      id: 'field-1',
      value: 'world',
      info: { extra: true },
    });
  });
});
