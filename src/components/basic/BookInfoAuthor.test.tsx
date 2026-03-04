import { render, screen } from '@testing-library/react-native';
import BookInfoAuthor from './BookInfoAuthor';

describe('BookInfoAuthor Component', () => {
  it('should render author name', () => {
    render(<BookInfoAuthor>John Doe</BookInfoAuthor>);
    expect(screen.getByText('John Doe')).toBeTruthy();
  });

  it('should render with custom style without crashing', () => {
    render(
      <BookInfoAuthor style={{ color: 'red' }}>Styled Author</BookInfoAuthor>,
    );
    expect(screen.getByText('Styled Author')).toBeTruthy();
  });

  it('should render empty text without crashing', () => {
    render(<BookInfoAuthor>{''}</BookInfoAuthor>);
    expect(screen.queryByText('John Doe')).toBeNull();
  });
});
