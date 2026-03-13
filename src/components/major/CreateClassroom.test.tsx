import { render } from '@testing-library/react-native';
import CreateClassroom from './CreateClassroom';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  defaultClassroomUid: 'default-classroom',
  sortedClassrooms: [
    { uid: 'default-classroom', name: 'Default', members: [] },
  ],
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyPush: jest.fn(),
}));
jest.mock('../../utils/toolbox', () => ({
  getIdsFromAccountId: () => ({ userId: 'user1' }),
}));
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/DialogInput', () => () => null);
jest.mock('../basic/BackFunction', () => () => null);
jest.mock('../basic/SelectWebPortalWrapper', () => () => null);

const defaultProps = {
  open: true,
  requestHide: jest.fn(),
  bookId: 'book1',
  inEditMode: false,
  toggleInEditMode: jest.fn(),
  accounts: { 'idp1:user1': { fullname: 'Test User', email: 'test@test.com' } },
  books: { book1: { accounts: { 'idp1:user1': {} } } },
  userDataByBookId: {},
  createClassroom: jest.fn(),
  setCurrentClassroom: jest.fn(),
  setSelectedToolUid: jest.fn(),
};

describe('CreateClassroom Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<CreateClassroom {...defaultProps} />)).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<CreateClassroom {...defaultProps} open={false} />),
    ).not.toThrow();
  });
});
