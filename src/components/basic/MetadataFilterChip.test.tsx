import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import MetadataFilterChip from './MetadataFilterChip';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('../../redux/actions', () => ({ changeLibraryFilter: jest.fn() }));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../utils/toolbox', () => ({
  textToReactNative: (text: string) => text,
}));

const defaultProps = {
  metadataKeyId: 'key-1',
  value: 'Fiction',
  requestClose: jest.fn(),
  changeLibraryFilter: jest.fn(),
};

describe('MetadataFilterChip Component', () => {
  beforeEach(() => {
    defaultProps.requestClose.mockClear();
    defaultProps.changeLibraryFilter.mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<MetadataFilterChip {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the chip value text', () => {
    render(<MetadataFilterChip {...defaultProps} />);
    expect(screen.getByText('Fiction')).toBeTruthy();
  });

  it('should call changeLibraryFilter and requestClose when pressed', () => {
    render(<MetadataFilterChip {...defaultProps} />);

    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));

    expect(defaultProps.changeLibraryFilter).toHaveBeenCalledWith({
      type: 'metadata',
      metadataKeyId: 'key-1',
      value: 'Fiction',
    });
    expect(defaultProps.requestClose).toHaveBeenCalledTimes(1);
  });
});
