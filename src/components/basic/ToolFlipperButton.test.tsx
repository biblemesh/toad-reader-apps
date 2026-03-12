import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';
import ToolFlipperButton from './ToolFlipperButton';

jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  iconThemedStyle: {},
}));
jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../utils/toolbox', () => ({ getToolbarHeight: () => 48 }));
jest.mock('./Icon', () => () => null);

const defaultProps = {
  side: 'left',
  onPageChange: jest.fn(),
  newPageIndex: 2,
};

describe('ToolFlipperButton Component', () => {
  beforeEach(() => {
    defaultProps.onPageChange.mockClear();
  });

  it('should render without crashing with side="left"', () => {
    const { toJSON } = render(
      <ToolFlipperButton {...defaultProps} side="left" />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should render without crashing with side="right"', () => {
    const { toJSON } = render(
      <ToolFlipperButton {...defaultProps} side="right" />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should call onPageChange with newPageIndex when pressed', () => {
    render(<ToolFlipperButton {...defaultProps} />);
    fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });
});
