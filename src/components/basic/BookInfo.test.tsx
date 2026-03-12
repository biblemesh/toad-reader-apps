import { render, screen } from '@testing-library/react-native';
import BookInfo from './BookInfo';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: { extra: {} },
  },
}));

jest.mock('redux', () => ({
  bindActionCreators: () => ({}),
}));

jest.mock('react-redux', () => ({
  connect: () => (Component) => Component,
}));

jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);

jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
}));

jest.mock(
  '../../hooks/useCoverHref',
  () => () => 'http://example.com/cover.jpg',
);

jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: jest.fn(),
  getReqOptionsWithAdditions: jest.fn(),
  getIdsFromAccountId: jest.fn(),
  safeFetch: jest.fn(),
  getVersionString: jest.fn(),
}));

jest.mock('../../redux/actions', () => ({
  deleteBook: jest.fn(),
  setSubscriptions: jest.fn(),
}));

jest.mock('./BookInfoCover', () => () => null);
jest.mock('./BookInfoTitle', () => () => null);
jest.mock('./BookInfoAuthor', () => () => null);
jest.mock('./BookInfoTrial', () => () => null);
jest.mock('./BookInfoMetadata', () => () => null);
jest.mock('./BookInfoIsbn', () => () => null);
jest.mock('./BookInfoId', () => () => null);
jest.mock('./BookInfoSize', () => () => null);
jest.mock('./BookInfoDetails', () => () => null);
jest.mock('../major/Dialog', () => () => null);
jest.mock('./CheckBox', () => () => null);
jest.mock('./CoverAndSpin', () => () => null);
jest.mock('../major/BookMetadataDialog', () => () => null);
jest.mock('../major/AudiobookDialog', () => () => null);
jest.mock('../major/BookSubscriptionsDialog', () => () => null);

const bookInfo = {
  title: 'Test Book',
  author: 'Test Author',
  flags: [],
  metadataValues: [],
  isbn: '1234567890',
  epubSizeInMB: 10,
  audiobookInfo: null,
  accounts: {},
};

const defaultProps = {
  bookId: 'book-1',
  bookInfo,
  isFirstRow: false,
  handleNewLibrary: jest.fn(),
  accounts: {},
  idps: {},
  subscriptions: [],
  deleteBook: jest.fn(),
  setSubscriptions: jest.fn(),
};

describe('BookInfo Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<BookInfo {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should not render delete button for non-admin user', () => {
    render(<BookInfo {...defaultProps} />);
    expect(screen.queryByText('Delete')).toBeNull();
  });

  it('should not render delete button when subscriptions list is empty', () => {
    render(<BookInfo {...defaultProps} subscriptions={[]} />);
    expect(screen.queryByText('Delete')).toBeNull();
  });
});
