import { render, screen, fireEvent } from '@testing-library/react-native';
import EnhancedConnecting from './EnhancedConnecting';
import useClassroomInfo from '../../hooks/useClassroomInfo';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({ classroom: null })),
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../basic/QRCode', () => () => null);

const defaultProps = {
  bookId: 'book1',
  books: {},
  userDataByBookId: {},
};

describe('EnhancedConnecting Component', () => {
  it('should return null when classroom is not set', () => {
    const { toJSON } = render(<EnhancedConnecting {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render access code when classroom is set', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroom: { access_code: 'ABC123', instructor_access_code: 'XYZ789' },
    });
    render(<EnhancedConnecting {...defaultProps} />);
    expect(screen.getByText('ABC123')).toBeTruthy();
  });

  it('should show instructor code after pressing the link', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroom: { access_code: 'ABC123', instructor_access_code: 'XYZ789' },
    });
    render(<EnhancedConnecting {...defaultProps} />);
    fireEvent.press(screen.getByText('Connect additional instructors'));
    expect(screen.getByText('XYZ789')).toBeTruthy();
  });
});
