import { render } from '@testing-library/react-native';
import BookDownloader from './BookDownloader';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
}));
jest.mock('../../hooks/useBookCookies', () => ({ getBookCookie: jest.fn() }));
jest.mock('../../utils/toolbox', () => ({
  getBooksDir: () => 'file://test/',
  getDataOrigin: () => 'https://test.example.com',
  getIDPOrigin: () => 'https://test.example.com',
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
}));
jest.mock('../../utils/epubDownloader', () => ({
  fetchEpubAndAssets: jest.fn(),
}));
jest.mock('../../utils/parseEpub', () => jest.fn());
jest.mock('../../utils/downloadAsync', () => jest.fn());

const defaultProps = {
  downloadPaused: false,
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  bookDownloadQueue: [],
  books: {},
  downloadProgressByBookId: {},
  setBookCookies: jest.fn(),
  removeFromBookDownloadQueue: jest.fn(),
  setDownloadProgress: jest.fn(),
  setDownloadStatus: jest.fn(),
  setTocAndSpines: jest.fn(),
  updateAccount: jest.fn(),
};

describe('BookDownloader Component', () => {
  it('should render null (no visible UI)', () => {
    const { toJSON } = render(<BookDownloader {...defaultProps} />);
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing with an empty download queue', () => {
    expect(() => render(<BookDownloader {...defaultProps} />)).not.toThrow();
  });

  it('should render without crashing with a download queued', () => {
    expect(() =>
      render(
        <BookDownloader {...defaultProps} bookDownloadQueue={['book1']} />,
      ),
    ).not.toThrow();
  });
});
