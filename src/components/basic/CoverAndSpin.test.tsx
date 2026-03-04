import { render, screen } from '@testing-library/react-native';
import CoverAndSpin from './CoverAndSpin';

jest.mock('./Spin', () => () => null);

describe('CoverAndSpin Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<CoverAndSpin />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render text when text prop is provided', () => {
    render(<CoverAndSpin text="Loading your book..." />);
    expect(screen.getByText('Loading your book...')).toBeTruthy();
  });

  it('should not render text when text prop is not provided', () => {
    render(<CoverAndSpin />);
    expect(screen.queryByText('Loading your book...')).toBeNull();
  });
});
