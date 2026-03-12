import { render, screen } from '@testing-library/react-native';
import HighlighterLabel from './HighlighterLabel';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: { NUM_COLOR_OPTIONS: 3 } } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('../../redux/actions', () => ({
  setHighlight: jest.fn(),
  deleteHighlight: jest.fn(),
}));
jest.mock('@expo/vector-icons', () => ({ Ionicons: () => null }));
jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));
jest.mock('../../hooks/useClassroomInfo', () => () => ({
  bookVersion: 'PUBLISHER',
  classrooms: [],
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  routerState: { widget: false },
}));
jest.mock('../../hooks/useNonBlurringOnPress', () => (handler: () => void) => ({
  onPress: handler,
}));
jest.mock('./HighlighterShareIcon', () => () => null);
jest.mock('./HighlighterColorSwitcher', () => () => null);
jest.mock('./HighlighterEmbedIcon', () => () => null);
jest.mock('./Icon', () => () => null);

const defaultProps = {
  selectionInfo: {
    text: 'Selected text',
    spineIdRef: 'spine-1',
    cfi: '/4/2/1',
  },
  endEditingNote: jest.fn(),
  bookId: 'book-1',
  idpId: 1,
  highlight: null,
  isEditingNote: false,
  hasSketch: false,
  setEditingSketch: jest.fn(),
  idps: { '1': { domain: 'example.com' } },
  books: { 'book-1': { title: 'Book One', accounts: {} } },
  userDataByBookId: {},
  accounts: { 'account-1': { isAdmin: false } },
  setHighlight: jest.fn(),
  deleteHighlight: jest.fn(),
};

describe('HighlighterLabel Component', () => {
  it('should render "Highlight the selection" when no highlight is active', () => {
    render(<HighlighterLabel {...defaultProps} />);
    expect(screen.getByText('Highlight the selection')).toBeTruthy();
  });

  it('should render the selected text when a highlight exists', () => {
    render(
      <HighlighterLabel {...defaultProps} highlight={{ color: 1, note: '' }} />,
    );
    expect(screen.getByText('Selected text')).toBeTruthy();
  });

  it('should render the "Done" button when isEditingNote is true', () => {
    render(
      <HighlighterLabel
        {...defaultProps}
        highlight={{ color: 1, note: '' }}
        isEditingNote={true}
      />,
    );
    expect(screen.getByText('Done')).toBeTruthy();
  });
});
