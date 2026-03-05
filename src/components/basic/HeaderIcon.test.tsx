import { render, fireEvent, screen } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';
import HeaderIcon from './HeaderIcon';

jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
}));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('./Icon', () => () => null);

describe('HeaderIcon Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<HeaderIcon iconName="home" />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onPress when pressed and no path is provided', () => {
    const mockOnPress = jest.fn();
    render(<HeaderIcon iconName="home" onPress={mockOnPress} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render children', () => {
    render(
      <HeaderIcon iconName="home">
        <Text>Home</Text>
      </HeaderIcon>,
    );
    expect(screen.getByText('Home')).toBeTruthy();
  });
});
