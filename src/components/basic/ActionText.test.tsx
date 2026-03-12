import { render, fireEvent, screen } from '@testing-library/react-native';
import ActionText from './ActionText';

jest.mock('../../hooks/useThemedStates', () => () => ({}));

describe('ActionText Component', () => {
  it('should render text content', () => {
    render(<ActionText>Click me</ActionText>);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('should call onPress with id and info when pressed', () => {
    const mockOnPress = jest.fn();
    const testId = 'action-1';
    const testInfo = { type: 'link' };

    render(
      <ActionText id={testId} info={testInfo} onPress={mockOnPress}>
        Submit
      </ActionText>,
    );

    fireEvent.press(screen.getByText('Submit'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith({ id: testId, info: testInfo });
  });

  it('should not crash when onPress is not provided', () => {
    render(<ActionText>No Handler</ActionText>);

    expect(() => {
      fireEvent.press(screen.getByText('No Handler'));
    }).not.toThrow();
  });
});
