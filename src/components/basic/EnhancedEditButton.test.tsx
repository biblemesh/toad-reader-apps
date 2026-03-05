import { render, fireEvent, screen } from '@testing-library/react-native';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import EnhancedEditButton from './EnhancedEditButton';

jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../basic/Icon', () => () => null);

describe('EnhancedEditButton Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<EnhancedEditButton onPress={jest.fn()} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should show an alert when pressed on non-web', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<EnhancedEditButton onPress={jest.fn()} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));

    expect(alertSpy).toHaveBeenCalledWith(
      'Note',
      'Editing is currently restricted to the web app.',
    );
    alertSpy.mockRestore();
  });

  it('should not crash when pressed without an onPress handler', () => {
    render(<EnhancedEditButton />);
    expect(() => {
      fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));
    }).not.toThrow();
  });
});
