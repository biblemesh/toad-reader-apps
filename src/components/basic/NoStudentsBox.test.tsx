import { render, screen } from '@testing-library/react-native';
import NoStudentsBox from './NoStudentsBox';

jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));

describe('NoStudentsBox Component', () => {
  it('should render the default message when no message prop is provided', () => {
    render(<NoStudentsBox />);
    expect(
      screen.getByText('This classroom does not yet have any students.'),
    ).toBeTruthy();
  });

  it('should render a custom message when provided', () => {
    render(<NoStudentsBox message="No students found." />);
    expect(screen.getByText('No students found.')).toBeTruthy();
  });

  it('should always render the sample data notice', () => {
    render(<NoStudentsBox />);
    expect(screen.getByText('Displaying sample data below.')).toBeTruthy();
  });
});
