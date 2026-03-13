import { render } from '@testing-library/react-native';
import BookPages from './BookPages';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('react-use/lib/usePrevious', () => () => undefined);
jest.mock('../../hooks/useAdjustedDimensions', () => () => ({ height: 800 }));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../hooks/usePageSize', () => () => ({
  pageWidth: 100,
  pageHeight: 150,
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  bookVersion: 'BASE',
  canViewFrontMatter: false,
}));
jest.mock('../../utils/toolbox', () => ({
  getToolbarHeight: () => 56,
  getStatusBarCurrentHeight: () => 0,
}));
jest.mock('../basic/PagesSpineHeading', () => () => null);
jest.mock('../basic/PagesRow', () => () => null);
jest.mock('../basic/PagesPage', () => () => null);
jest.mock('./EnhancedHeader', () => () => null);

const defaultProps = {
  spineIdRef: 'spine1',
  pageIndexInSpine: 0,
  spines: [],
  bookId: 'book1',
  updateSnapshotCoords: jest.fn(),
  zoomToPage: jest.fn(),
  inEditMode: false,
  toggleInEditMode: jest.fn(),
  setModeToPage: jest.fn(),
  footerHeight: 50,
  books: {},
  userDataByBookId: {},
  displaySettings: { textSize: 100 },
  sidePanelSettings: { open: false },
};

describe('BookPages Component', () => {
  it('should return null when list is empty (no spines loaded)', () => {
    const { toJSON } = render(<BookPages {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing', () => {
    expect(() => render(<BookPages {...defaultProps} />)).not.toThrow();
  });
});
