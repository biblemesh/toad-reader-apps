import { render } from '@testing-library/react-native';
import Audiobook from './Audiobook';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('react-router-dom', () => ({
  useParams: () => ({ bookId: 'book1' }),
}));
jest.mock('expo-image', () => ({ Image: () => null }));
jest.mock('../../utils/syncUserData', () => ({ refreshUserData: jest.fn() }));
jest.mock('../../utils/removeEpub', () => ({ removeEpub: jest.fn() }));
jest.mock('../../utils/toolbox', () => ({
  setStatusBarHidden: jest.fn(),
  showConsent: jest.fn(),
  getBooksDir: () => 'file://test/',
  getDataOrigin: () => 'https://test.example.com',
  getIDPOrigin: () => 'https://test.example.com',
}));
jest.mock('../../utils/analytics', () => ({ logEvent: jest.fn() }));
jest.mock('../../hooks/useRouterState', () => () => ({
  historyGoBackToLibrary: jest.fn(),
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useBookCookies', () => () => 'test-cookie');
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 400, height: 800 },
}));
jest.mock('../../hooks/useCoverHref', () => () => null);
jest.mock(
  '../basic/SafeLayout',
  () =>
    ({ children }: { children: unknown }) =>
      children,
);
jest.mock('../basic/BackFunction', () => () => null);
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../major/AudiobookHeader', () => () => null);
jest.mock('../major/AudiobookPlayer', () => () => null);

const defaultProps = {
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie', libraryHash: 'hash' } },
  books: {
    book1: {
      title: 'Test Audiobook',
      downloadStatus: 2,
      audiobookInfo: { spines: [] },
      accounts: { 'idp1:user1': {} },
    },
  },
  userDataByBookId: {},
  downloadProgressByBookId: {},
  setLatestLocation: jest.fn(),
  startRecordReading: jest.fn(),
  endRecordReading: jest.fn(),
  setConsentShown: jest.fn(),
  setBookCookies: jest.fn(),
  setDownloadStatus: jest.fn(),
  pushToBookDownloadQueue: jest.fn(),
  removeFromBookDownloadQueue: jest.fn(),
  clearUserDataExceptProgress: jest.fn(),
};

describe('Audiobook Screen', () => {
  it('should render without crashing', () => {
    expect(() => render(<Audiobook {...defaultProps} />)).not.toThrow();
  });

  it('should render with no books (book not found)', () => {
    expect(() =>
      render(<Audiobook {...defaultProps} books={{}} />),
    ).not.toThrow();
  });

  it('should render with latest location data', () => {
    expect(() =>
      render(
        <Audiobook
          {...defaultProps}
          userDataByBookId={{
            book1: {
              latest_location: '{"filename":"ch1.mp3","positionMS":5000}',
            },
          }}
        />,
      ),
    ).not.toThrow();
  });
});
