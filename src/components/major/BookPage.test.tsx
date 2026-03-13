import { render } from '@testing-library/react-native';
import BookPage from './BookPage';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-use/lib/usePrevious', () => () => undefined);
jest.mock('@react-native-community/hooks', () => ({
  useLayout: () => ({ onLayout: jest.fn(), width: 400 }),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../utils/postMessage', () => ({ postMessage: jest.fn() }));
jest.mock('../../utils/toolbox', () => ({
  getDisplaySettingsObj: () => ({}),
  getFirstBookLinkInfo: () => null,
  latestLocationToStr: () => null,
  openURL: jest.fn(),
  getToolCfiCounts: () => ({}),
}));
jest.mock('../../hooks/useDidUpdate', () => jest.fn());
jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
  historyReplace: jest.fn(),
  historyGoBackToLibrary: jest.fn(),
  routerState: {},
  getRouterState: jest.fn(),
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  visibleTools: [],
  spines: [],
  toc: [],
  instructorHighlights: [],
  bookVersion: 'BASE',
  idpId: 'idp1',
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useIsUpdatingRef', () => () => [
  { current: false },
  jest.fn(),
]);
jest.mock('./PageWebView', () => () => null);
jest.mock('./DisplaySettings', () => () => null);
jest.mock('./Highlighter', () => () => null);
jest.mock('../basic/BookPageMessage', () => () => null);
jest.mock('../basic/CoverAndSpin', () => () => null);

const defaultProps = {
  spineIdRef: 'spine1',
  pageIndexInSpine: 0,
  hrefToGoTo: null,
  cfiToGoTo: null,
  showSettings: false,
  selectionInfo: null,
  setSelectionInfo: jest.fn(),
  reportSpots: jest.fn(),
  toolCfiCounts: {},
  bookId: 'book1',
  bookLoaded: true,
  indicateLoaded: jest.fn(),
  requestShowPages: jest.fn(),
  temporarilyPauseProcessing: jest.fn(),
  requestHideSettings: jest.fn(),
  latest_location: null,
  inEditMode: false,
  setInPageTurn: jest.fn(),
  unselectText: jest.fn(),
  books: { book1: { title: 'Test Book' } },
  userDataByBookId: {},
  displaySettings: { textSize: 100 },
  setLatestLocation: jest.fn(),
  startRecordReading: jest.fn(),
  endRecordReading: jest.fn(),
  indicateRecordReadingActivity: jest.fn(),
  setSelectedToolUid: jest.fn(),
};

describe('BookPage Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<BookPage {...defaultProps} />)).not.toThrow();
  });

  it('should render without crashing when book is not loaded', () => {
    expect(() =>
      render(<BookPage {...defaultProps} bookLoaded={false} />),
    ).not.toThrow();
  });

  it('should render without crashing when settings are shown', () => {
    expect(() =>
      render(<BookPage {...defaultProps} showSettings={true} />),
    ).not.toThrow();
  });
});
