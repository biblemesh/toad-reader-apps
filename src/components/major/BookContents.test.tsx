import { render } from '@testing-library/react-native';
import BookContents from './BookContents';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));
jest.mock('@react-native-community/hooks', () => ({
  useLayout: () => ({ onLayout: jest.fn(), width: 300, y: 0 }),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../utils/toolbox', () => ({
  getSpineIdRefsInToc: () => [],
}));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  toc: null,
  classroomUid: 'classroom1',
  visibleTools: [],
  selectedTool: null,
  bookVersion: 'BASE',
  isDefaultClassroom: true,
  myRole: 'READER',
  viewingFrontMatter: false,
  viewingOptions: false,
  selectedToolUid: null,
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useSpineIdRefAndCfi', () => () => ({
  spineIdRef: null,
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  getRouterState: jest.fn(),
  historyPush: jest.fn(),
}));
jest.mock('../basic/BookContentsLine', () => () => null);
jest.mock('./EnhancedHeader', () => () => null);
jest.mock('../basic/FAB', () => () => null);

const defaultProps = {
  goTo: jest.fn(),
  bookId: 'book1',
  reportSpots: jest.fn(),
  onToolMove: jest.fn(),
  onToolRelease: jest.fn(),
  onScroll: jest.fn(),
  inEditMode: false,
  toggleInEditMode: jest.fn(),
  setModeToPage: jest.fn(),
  hideFABs: false,
  books: {},
  userDataByBookId: {},
  createTool: jest.fn(),
};

describe('BookContents Component', () => {
  it('should return null when toc is not available', () => {
    const { toJSON } = render(<BookContents {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing', () => {
    expect(() => render(<BookContents {...defaultProps} />)).not.toThrow();
  });
});
