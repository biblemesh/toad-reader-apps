import { render, fireEvent, screen } from '@testing-library/react-native';
import CheckBox from './CheckBox';

describe('CheckBox Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<CheckBox checked={false} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onChange with toggled value when pressed', () => {
    const mockOnChange = jest.fn();
    render(<CheckBox checked={false} onChange={mockOnChange} />);

    fireEvent.press(screen.getByRole('checkbox'));

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('should call onChangeInfo with id and value when provided', () => {
    const mockOnChangeInfo = jest.fn();
    const testId = 'test-checkbox';

    render(
      <CheckBox id={testId} checked={false} onChangeInfo={mockOnChangeInfo} />,
    );

    fireEvent.press(screen.getByRole('checkbox'));

    expect(mockOnChangeInfo).toHaveBeenCalledWith({ id: testId, value: true });
  });
});
