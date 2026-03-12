import { render } from '@testing-library/react-native';
import BookInfoCover from './BookInfoCover';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: { extra: { DEV_USE_DEVELOPMENT_BACKEND: false } },
  },
}));

jest.mock('redux', () => ({
  bindActionCreators: () => ({}),
}));

jest.mock('react-redux', () => ({
  connect: () => (Component) => Component,
}));

jest.mock('expo-image', () => ({
  Image: () => null,
}));

jest.mock('../../hooks/useRouterState', () => ({
  Link: ({ children }) => children,
}));

jest.mock('../../hooks/useDownloadProgress', () => () => 0);
jest.mock('../../hooks/useCoverHref', () => () => 'covers/book.jpg');
jest.mock('./CoverAndSpin', () => () => null);

jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://api.example.com',
  getIDPOrigin: () => 'https://idp.example.com',
}));

const defaultProps = {
  bookId: 'book-1',
  bookInfo: {
    downloadStatus: 0,
    accounts: { '1:user1': {} },
    audiobookInfo: null,
  },
  downloadProgressByBookId: {},
  idps: { '1': { domain: 'example.com' } },
};

describe('BookInfoCover Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<BookInfoCover {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render without crashing when book is downloading (downloadStatus 1)', () => {
    const { toJSON } = render(
      <BookInfoCover
        {...defaultProps}
        bookInfo={{ ...defaultProps.bookInfo, downloadStatus: 1 }}
      />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should render without crashing for an audiobook', () => {
    const { toJSON } = render(
      <BookInfoCover
        {...defaultProps}
        bookInfo={{ ...defaultProps.bookInfo, audiobookInfo: { chapters: [] } }}
      />,
    );
    expect(toJSON()).not.toBeNull();
  });
});
