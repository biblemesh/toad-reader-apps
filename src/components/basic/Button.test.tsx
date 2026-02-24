import { render, fireEvent } from '@testing-library/react-native';
import Button from './Button';

describe('Button Component', () => {
  it('should render with text content', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('should be accessible via testID', () => {
    const { getByTestId } = render(
      <Button testID="my-button">Test Button</Button>,
    );
    expect(getByTestId('my-button')).toBeTruthy();
  });

  it('should call onPress with id and info when pressed', () => {
    const mockOnPress = jest.fn();
    const testId = 'submit-btn';
    const testInfo = { type: 'primary' };

    const { getByText } = render(
      <Button id={testId} info={testInfo} onPress={mockOnPress}>
        Submit
      </Button>,
    );

    fireEvent.press(getByText('Submit'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith({
      id: testId,
      info: testInfo,
    });
  });

  it('should not crash when onPress is not provided', () => {
    const { getByText } = render(<Button>No Handler</Button>);

    expect(() => {
      fireEvent.press(getByText('No Handler'));
    }).not.toThrow();
  });
});
