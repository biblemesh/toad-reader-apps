import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { openURL } from '../../utils/toolbox';
import LinkLikeText from './LinkLikeText';

jest.mock('../../utils/toolbox', () => ({ openURL: jest.fn() }));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
}));

describe('LinkLikeText Component', () => {
  it('should render its children text', () => {
    render(<LinkLikeText>Click here</LinkLikeText>);
    expect(screen.getByText('Click here')).toBeTruthy();
  });

  it('should call the custom onPress when pressed', () => {
    const mockOnPress = jest.fn();
    render(<LinkLikeText onPress={mockOnPress}>Link</LinkLikeText>);

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should call openURL when no onPress is provided', () => {
    render(<LinkLikeText url="https://example.com">Link</LinkLikeText>);

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));

    expect(openURL).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://example.com' }),
    );
  });
});
