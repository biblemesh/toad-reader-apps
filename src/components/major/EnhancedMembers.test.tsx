import { render } from '@testing-library/react-native';
import EnhancedMembers from './EnhancedMembers';
import useClassroomInfo from '../../hooks/useClassroomInfo';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classroomUid: null,
    members: [],
  })),
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('@ui-kitten/components', () => ({
  ...jest.requireActual('@ui-kitten/components'),
  List: () => null,
  ListItem: () => null,
}));
jest.mock('../basic/Button', () => () => null);
jest.mock('../basic/Icon', () => () => null);

const defaultProps = {
  bookId: 'book1',
  books: {},
  userDataByBookId: {},
  deleteClassroomMember: jest.fn(),
};

describe('EnhancedMembers Component', () => {
  it('should return null when classroomUid is not set', () => {
    const { toJSON } = render(<EnhancedMembers {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing when classroomUid is set with empty members', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classroomUid: 'classroom1',
      members: [],
    });
    expect(() => render(<EnhancedMembers {...defaultProps} />)).not.toThrow();
  });
});
