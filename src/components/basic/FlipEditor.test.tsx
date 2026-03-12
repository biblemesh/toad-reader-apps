import { render } from '@testing-library/react-native';
import ReactNativeFlipEditor from 'react-native-flip-editor';
import FlipEditor from './FlipEditor';

jest.mock('react-native-flip-editor', () => jest.fn(() => null));

describe('FlipEditor Component', () => {
  beforeEach(() => {
    jest.mocked(ReactNativeFlipEditor).mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<FlipEditor id="editor-1" />);
    expect(toJSON()).toBeNull();
  });

  it('should call updateContent when the editor triggers a content change', () => {
    const mockUpdateContent = jest.fn();
    render(<FlipEditor id="editor-1" updateContent={mockUpdateContent} />);

    const passedProps = jest.mocked(ReactNativeFlipEditor).mock.calls[0][0];
    passedProps.updateContent('new content');

    expect(mockUpdateContent).toHaveBeenCalledWith('new content');
  });

  it('should call onChangeInfo with id, value and info when content changes', () => {
    const mockOnChangeInfo = jest.fn();
    render(
      <FlipEditor
        id="editor-1"
        info={{ type: 'note' }}
        onChangeInfo={mockOnChangeInfo}
      />,
    );

    const passedProps = jest.mocked(ReactNativeFlipEditor).mock.calls[0][0];
    passedProps.updateContent('updated content');

    expect(mockOnChangeInfo).toHaveBeenCalledWith({
      id: 'editor-1',
      value: 'updated content',
      info: { type: 'note' },
    });
  });
});
