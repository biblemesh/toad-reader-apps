import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity, Image } from 'react-native';
import TappableImage from './TappableImage';

const defaultProps = {
  onPress: jest.fn(),
  onPressInfo: { itemId: 42 },
  source: { uri: 'https://example.com/image.png' },
};

describe('TappableImage Component', () => {
  beforeEach(() => {
    defaultProps.onPress.mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<TappableImage {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call onPress with onPressInfo when pressed', () => {
    render(<TappableImage {...defaultProps} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));
    expect(defaultProps.onPress).toHaveBeenCalledWith({ itemId: 42 });
  });

  it('should render an Image', () => {
    render(<TappableImage {...defaultProps} />);
    expect(screen.UNSAFE_getByType(Image)).toBeTruthy();
  });
});
