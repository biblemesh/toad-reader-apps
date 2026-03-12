import { render, screen } from '@testing-library/react-native';
import BookInfoId from './BookInfoId';

describe('BookInfoId Component', () => {
  it('should render formatted book id text', () => {
    render(<BookInfoId id="book-123" />);
    expect(screen.getByText('Book id: book-123')).toBeTruthy();
  });

  it('should render with a different id value', () => {
    render(<BookInfoId id="42" />);
    expect(screen.getByText('Book id: 42')).toBeTruthy();
  });

  it('should render with custom style without crashing', () => {
    render(<BookInfoId id="book-456" style={{ color: 'red' }} />);
    expect(screen.getByText('Book id: book-456')).toBeTruthy();
  });
});
