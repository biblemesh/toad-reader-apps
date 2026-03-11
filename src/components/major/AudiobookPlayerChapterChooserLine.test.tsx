import { render, screen, fireEvent } from '@testing-library/react-native';
import AudiobookPlayerChapterChooserLine from './AudiobookPlayerChapterChooserLine';

jest.mock('../../hooks/useThemedStates', () => () => ({}));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
}));

describe('AudiobookPlayerChapterChooserLine Component', () => {
  it('should render the chapter label', () => {
    render(
      <AudiobookPlayerChapterChooserLine
        index={0}
        label="Chapter 1"
        onPress={jest.fn()}
      />,
    );
    expect(screen.getByText('Chapter 1')).toBeTruthy();
  });

  it('should call onPress with the index when pressed', () => {
    const mockOnPress = jest.fn();
    render(
      <AudiobookPlayerChapterChooserLine
        index={2}
        label="Chapter 3"
        onPress={mockOnPress}
      />,
    );
    fireEvent.press(screen.getByText('Chapter 3'));
    expect(mockOnPress).toHaveBeenCalledWith(2);
  });

  it('should render without crashing with no style', () => {
    expect(() =>
      render(
        <AudiobookPlayerChapterChooserLine
          index={0}
          label="Intro"
          onPress={jest.fn()}
        />,
      ),
    ).not.toThrow();
  });
});
