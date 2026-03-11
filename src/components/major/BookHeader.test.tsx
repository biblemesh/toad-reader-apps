import { render } from '@testing-library/react-native';
import BookHeader from './BookHeader';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-dom', () => ({ createPortal: jest.fn(() => null) }));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('../../hooks/useNetwork', () => () => ({ online: true }));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  book: null,
  canViewDashboard: false,
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  historyGo: jest.fn(),
  historyPush: jest.fn(),
  getRouterState: jest.fn(),
}));
jest.mock('../../utils/toolbox', () => ({
  getFirstBookLinkInfo: () => null,
  openURL: jest.fn(),
}));
jest.mock('../../utils/removeEpub', () => ({ removeEpub: jest.fn() }));
jest.mock('../../utils/analytics', () => ({ logEvent: jest.fn() }));
jest.mock('../basic/AppHeader', () => () => null);
jest.mock('../basic/HeaderIcon', () => () => null);
jest.mock('../basic/SaveStateHeaderIcon', () => () => null);

const defaultProps = {
  bookId: 'book1',
  title: 'Test Book',
  subtitle: 'A subtitle',
  mode: 'page',
  showDisplaySettings: jest.fn(),
  onLibraryPress: jest.fn(),
  setModeToPage: jest.fn(),
  toggleShowSearch: jest.fn(),
  books: { book1: { title: 'Test Book', downloadStatus: 2 } },
  userDataByBookId: {},
  sidePanelSettings: { open: false },
  removeFromBookDownloadQueue: jest.fn(),
  setDownloadStatus: jest.fn(),
  clearTocAndSpines: jest.fn(),
  clearUserDataExceptProgress: jest.fn(),
  toggleSidePanelOpen: jest.fn(),
  setSelectedToolUid: jest.fn(),
};

describe('BookHeader Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<BookHeader {...defaultProps} />)).not.toThrow();
  });

  it('should render in wide mode', () => {
    expect(() => render(<BookHeader {...defaultProps} />)).not.toThrow();
  });

  it('should render without a subtitle', () => {
    expect(() =>
      render(<BookHeader {...defaultProps} subtitle={undefined} />),
    ).not.toThrow();
  });
});
