import { render, screen } from '@testing-library/react-native';
import { Image } from 'react-native';
import Icon from './Icon';

jest.mock('expo-font', () => ({
  loadAsync: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@expo/vector-icons', () => {
  const makeIcon = () => {
    const MockIcon = () => null;
    MockIcon.font = {};
    return MockIcon;
  };
  return {
    Ionicons: makeIcon(),
    MaterialIcons: makeIcon(),
    MaterialCommunityIcons: makeIcon(),
    FontAwesome: makeIcon(),
  };
});

describe('Icon Component', () => {
  it('should render without crashing with the default ion pack', () => {
    expect(() => render(<Icon name="home" />)).not.toThrow();
  });

  it('should render an Image when pack is "image"', () => {
    render(<Icon pack="image" name={1} style={{ width: 32, height: 32 }} />);
    expect(screen.UNSAFE_getByType(Image)).toBeTruthy();
  });

  it('should render without crashing with the materialCommunity pack', () => {
    expect(() =>
      render(<Icon pack="materialCommunity" name="marker" />),
    ).not.toThrow();
  });
});
