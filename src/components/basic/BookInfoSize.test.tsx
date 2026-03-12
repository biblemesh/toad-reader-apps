import { render, screen } from '@testing-library/react-native';
import BookInfoSize from './BookInfoSize';

describe('BookInfoSize Component', () => {
  it('should render formatted size text', () => {
    render(<BookInfoSize epubSizeInMB={10} />);
    expect(screen.getByText('Size: 10 mb')).toBeTruthy();
  });

  it('should render with a different size value', () => {
    render(<BookInfoSize epubSizeInMB={250} />);
    expect(screen.getByText('Size: 250 mb')).toBeTruthy();
  });

  it('should render with custom style without crashing', () => {
    render(<BookInfoSize epubSizeInMB={5} style={{ color: 'red' }} />);
    expect(screen.getByText('Size: 5 mb')).toBeTruthy();
  });
});
