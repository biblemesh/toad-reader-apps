import { render } from '@testing-library/react-native';
import SketchPad from './SketchPad';
import HighlighterSketch from './HighlighterSketch';

jest.mock('./SketchPad', () => jest.fn(() => null));

const defaultProps = {
  sketch: null,
  updateSketchInEdit: jest.fn(),
  setEditingSketch: jest.fn(),
};

describe('HighlighterSketch Component', () => {
  beforeEach(() => {
    jest.mocked(SketchPad).mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<HighlighterSketch {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should call setEditingSketch(false) when onDone is invoked', () => {
    const mockSetEditingSketch = jest.fn();
    render(
      <HighlighterSketch
        {...defaultProps}
        setEditingSketch={mockSetEditingSketch}
      />,
    );

    const { onDone } = jest.mocked(SketchPad).mock.calls[0][0];
    onDone();

    expect(mockSetEditingSketch).toHaveBeenCalledWith(false);
  });

  it('should pass sketch and updateSketchInEdit props to SketchPad', () => {
    const mockSketch = { paths: [] };
    const mockUpdate = jest.fn();
    render(
      <HighlighterSketch
        {...defaultProps}
        sketch={mockSketch}
        updateSketchInEdit={mockUpdate}
      />,
    );

    const { sketch, updateSketchInEdit } =
      jest.mocked(SketchPad).mock.calls[0][0];
    expect(sketch).toBe(mockSketch);
    expect(updateSketchInEdit).toBe(mockUpdate);
  });
});
