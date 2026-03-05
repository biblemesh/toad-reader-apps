import { render } from '@testing-library/react-native';
import ColorSwitcher from './ColorSwitcher';
import HighlighterColorSwitcher from './HighlighterColorSwitcher';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('../../redux/actions', () => ({ setHighlight: jest.fn() }));
jest.mock('./ColorSwitcher', () => jest.fn(() => null));

const defaultProps = {
  bookId: 'book-1',
  highlight: { color: 1 },
  setHighlight: jest.fn(),
};

describe('HighlighterColorSwitcher Component', () => {
  beforeEach(() => {
    jest.mocked(ColorSwitcher).mockClear();
    defaultProps.setHighlight.mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<HighlighterColorSwitcher {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should call setHighlight with updated color when update is invoked', () => {
    render(<HighlighterColorSwitcher {...defaultProps} />);

    const { update } = jest.mocked(ColorSwitcher).mock.calls[0][0];
    update(2);

    expect(defaultProps.setHighlight).toHaveBeenCalledWith({
      color: 2,
      bookId: 'book-1',
    });
  });

  it('should pass the current highlight color to ColorSwitcher', () => {
    render(
      <HighlighterColorSwitcher {...defaultProps} highlight={{ color: 3 }} />,
    );

    const { color } = jest.mocked(ColorSwitcher).mock.calls[0][0];
    expect(color).toBe(3);
  });
});
