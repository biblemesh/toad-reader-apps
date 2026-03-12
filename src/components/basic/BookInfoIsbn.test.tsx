import { render, screen } from '@testing-library/react-native';
import BookInfoIsbn from './BookInfoIsbn';

describe('BookInfoIsbn Component', () => {
  it('should render formatted ISBN text', () => {
    render(<BookInfoIsbn isbn="978-0-123-45678-9" />);
    expect(screen.getByText('ISBN: 978-0-123-45678-9')).toBeTruthy();
  });

  it('should render with a different ISBN value', () => {
    render(<BookInfoIsbn isbn="0000000000" />);
    expect(screen.getByText('ISBN: 0000000000')).toBeTruthy();
  });

  it('should render without crashing when isbn is an empty string', () => {
    render(<BookInfoIsbn isbn="" />);
    expect(screen.getByText('ISBN: ')).toBeTruthy();
  });
});
