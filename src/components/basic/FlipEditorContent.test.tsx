import { render, screen } from '@testing-library/react-native';
import FlipEditor from './FlipEditor';
import FlipEditorContent from './FlipEditorContent';

jest.mock('./FlipEditor', () => jest.fn(() => null));

jest.mock('../../utils/toolbox', () => ({
  textToReactNative: (text: string) => text,
}));

describe('FlipEditorContent Component', () => {
  beforeEach(() => {
    jest.mocked(FlipEditor).mockClear();
  });

  it('should render plain text when content is not valid JSON', () => {
    render(<FlipEditorContent content="Hello, plain text!" />);
    expect(screen.getByText('Hello, plain text!')).toBeTruthy();
  });

  it('should render FlipEditor when content is valid JSON', () => {
    render(<FlipEditorContent content='{"text":"hello"}' />);
    expect(jest.mocked(FlipEditor)).toHaveBeenCalled();
  });

  it('should render without crashing when content is undefined', () => {
    const { toJSON } = render(<FlipEditorContent />);
    expect(toJSON()).not.toBeNull();
  });
});
