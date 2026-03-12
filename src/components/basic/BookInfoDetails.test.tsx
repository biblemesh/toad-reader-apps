import { render, screen } from '@testing-library/react-native';
import BookInfoDetails from './BookInfoDetails';

jest.mock('./Icon', () => () => null);

describe('BookInfoDetails Component', () => {
  it('should render "On device" when downloadStatus is 2', () => {
    render(
      <BookInfoDetails bookInfo={{ downloadStatus: 2, audiobookInfo: null }} />,
    );
    expect(screen.getByText('On device')).toBeTruthy();
  });

  it('should render "Downloading..." when downloadStatus is 1', () => {
    render(
      <BookInfoDetails bookInfo={{ downloadStatus: 1, audiobookInfo: null }} />,
    );
    expect(screen.getByText('Downloading...')).toBeTruthy();
  });

  it('should render "Tap to download" for a non-downloaded ebook', () => {
    render(
      <BookInfoDetails bookInfo={{ downloadStatus: 0, audiobookInfo: null }} />,
    );
    expect(screen.getByText('Tap to download')).toBeTruthy();
  });

  it('should render "Tap to open" for an audiobook', () => {
    render(
      <BookInfoDetails
        bookInfo={{ downloadStatus: 0, audiobookInfo: { chapters: [] } }}
      />,
    );
    expect(screen.getByText('Tap to open')).toBeTruthy();
  });
});
