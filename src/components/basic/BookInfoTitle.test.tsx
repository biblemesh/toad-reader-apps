import { render, screen } from '@testing-library/react-native';
import BookInfoTitle from './BookInfoTitle';

jest.mock('../../hooks/useRouterState', () => ({
  Link: ({ children }) => children,
}));

describe('BookInfoTitle Component', () => {
  it('should render children text', () => {
    render(<BookInfoTitle to="/book/1">My Book Title</BookInfoTitle>);
    expect(screen.getByText('My Book Title')).toBeTruthy();
  });

  it('should render without crashing when to prop is not provided', () => {
    render(<BookInfoTitle>No Link Title</BookInfoTitle>);
    expect(screen.getByText('No Link Title')).toBeTruthy();
  });

  it('should render a non-null element', () => {
    const { toJSON } = render(
      <BookInfoTitle to="/book/2">Another Title</BookInfoTitle>,
    );
    expect(toJSON()).not.toBeNull();
  });
});
