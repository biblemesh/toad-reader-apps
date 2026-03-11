import { render, screen } from '@testing-library/react-native';
import AudiobookPlayerChapterLine from './AudiobookPlayerChapterLine';

jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 400, height: 800 },
}));
jest.mock('../basic/Icon', () => () => null);
jest.mock('../basic/Button', () => () => null);
jest.mock('./AudiobookPlayerChapterChooserLine', () => () => null);

const defaultProps = {
  spines: [
    { filename: 'ch1.mp3', label: 'Chapter 1', durationMS: 60000 },
    { filename: 'ch2.mp3', label: 'Chapter 2', durationMS: 90000 },
  ],
  currentSpineIndex: 0,
  setCurrentSpineIndex: jest.fn(),
};

describe('AudiobookPlayerChapterLine Component', () => {
  it('should render the current chapter label', () => {
    render(<AudiobookPlayerChapterLine {...defaultProps} />);
    expect(screen.getByText('Chapter 1')).toBeTruthy();
  });

  it('should render without crashing with empty spines', () => {
    expect(() =>
      render(
        <AudiobookPlayerChapterLine
          spines={[]}
          currentSpineIndex={0}
          setCurrentSpineIndex={jest.fn()}
        />,
      ),
    ).not.toThrow();
  });

  it('should render the correct chapter when index changes', () => {
    render(
      <AudiobookPlayerChapterLine {...defaultProps} currentSpineIndex={1} />,
    );
    expect(screen.getByText('Chapter 2')).toBeTruthy();
  });
});
