import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import ToolChip from './ToolChip';

jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
  labelThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../utils/toolInfo', () => ({
  getToolInfo: () => ({
    toolInfoByType: {
      note: { icon: { name: 'pencil', pack: 'ion' }, text: 'Note' },
    },
  }),
}));
jest.mock('./Icon', () => () => null);

const defaultProps = {
  uid: 'tool-1',
  label: 'My Note',
  toolType: 'note',
  data: {},
  isDraft: false,
  onPress: jest.fn(),
  onToolMove: jest.fn(() => false),
  onToolRelease: jest.fn(),
};

describe('ToolChip Component', () => {
  beforeEach(() => {
    defaultProps.onPress.mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<ToolChip {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the label text', () => {
    render(<ToolChip {...defaultProps} />);
    expect(screen.getByText('My Note')).toBeTruthy();
  });

  it('should call onPress when the chip is pressed', () => {
    render(<ToolChip {...defaultProps} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });
});
