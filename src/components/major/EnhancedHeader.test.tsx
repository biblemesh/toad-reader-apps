import { render } from '@testing-library/react-native';
import EnhancedHeader from './EnhancedHeader';
import useClassroomInfo from '../../hooks/useClassroomInfo';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-dom', () => ({ createPortal: jest.fn(() => null) }));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  altThemedStyleSets: [{}],
}));
jest.mock('../../hooks/useClassroomInfo', () =>
  jest.fn(() => ({
    classrooms: [],
    classroom: null,
    enhancedIsOff: false,
    isDefaultClassroom: true,
    defaultClassroomUid: 'default',
    sortedClassrooms: [],
    bookVersion: 'BASE',
    canViewOptions: false,
    canViewFrontMatter: false,
    viewingDashboard: false,
    viewingOptions: false,
    viewingFrontMatter: false,
    iCanEdit: false,
    hasFrontMatterDraftData: false,
  })),
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { height: 800 },
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyPush: jest.fn(),
}));
jest.mock('./ManageClassrooms', () => () => null);
jest.mock('./CreateClassroom', () => () => null);
jest.mock('./ConnectToAClassroom', () => () => null);
jest.mock('../basic/EnhancedHeaderLine', () => () => null);
jest.mock('../basic/EnhancedEditButton', () => () => null);

const defaultProps = {
  bookId: 'book1',
  inEditMode: false,
  toggleInEditMode: jest.fn(),
  setModeToPage: jest.fn(),
  books: {},
  userDataByBookId: {},
  setSelectedToolUid: jest.fn(),
  setCurrentClassroom: jest.fn(),
};

describe('EnhancedHeader Component', () => {
  it('should return null when bookVersion is BASE', () => {
    const { toJSON } = render(<EnhancedHeader {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing when bookVersion is ENHANCED', () => {
    (useClassroomInfo as jest.Mock).mockReturnValue({
      classrooms: [],
      classroom: { uid: 'c1', name: 'My Class' },
      enhancedIsOff: false,
      isDefaultClassroom: false,
      defaultClassroomUid: 'default',
      sortedClassrooms: [{ uid: 'c1', name: 'My Class' }],
      bookVersion: 'ENHANCED',
      canViewOptions: true,
      canViewFrontMatter: false,
      viewingDashboard: false,
      viewingOptions: false,
      viewingFrontMatter: false,
      iCanEdit: false,
      hasFrontMatterDraftData: false,
    });
    expect(() => render(<EnhancedHeader {...defaultProps} />)).not.toThrow();
  });
});
