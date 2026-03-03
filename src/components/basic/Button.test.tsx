import { render, fireEvent, screen } from '@testing-library/react-native';
import Button from './Button';

describe('Button Component', () => {
  it('should render with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('should be accessible via testID', () => {
    render(<Button testID="my-button">Test Button</Button>);
    expect(screen.getByTestId('my-button')).toBeTruthy();
  });

  it('should call onPress with id and info when pressed', () => {
    const mockOnPress = jest.fn();
    const testId = 'submit-btn';
    const testInfo = { type: 'primary' };

    render(
      <Button id={testId} info={testInfo} onPress={mockOnPress}>
        Submit
      </Button>,
    );

    fireEvent.press(screen.getByText('Submit'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith({
      id: testId,
      info: testInfo,
    });
  });

  it('should not crash when onPress is not provided', () => {
    render(<Button>No Handler</Button>);

    expect(() => {
      fireEvent.press(screen.getByText('No Handler'));
    }).not.toThrow();
  });
});
