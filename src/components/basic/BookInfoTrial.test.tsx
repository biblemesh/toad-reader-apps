import { render, screen } from '@testing-library/react-native';
import BookInfoTrial from './BookInfoTrial';

describe('BookInfoTrial Component', () => {
  it('should render "Trial version" text', () => {
    render(<BookInfoTrial />);
    expect(screen.getByText('Trial version')).toBeTruthy();
  });

  it('should render with custom style without crashing', () => {
    render(<BookInfoTrial style={{ color: 'orange' }} />);
    expect(screen.getByText('Trial version')).toBeTruthy();
  });

  it('should render a non-null element', () => {
    const { toJSON } = render(<BookInfoTrial />);
    expect(toJSON()).not.toBeNull();
  });
});
