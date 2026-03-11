import { render } from '@testing-library/react-native';
import AudiobookDialog from './AudiobookDialog';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('expo-av', () => ({
  Audio: {
    Sound: {
      createAsync: jest
        .fn()
        .mockResolvedValue({
          sound: { setStatusAsync: jest.fn(), unloadAsync: jest.fn() },
        }),
    },
    setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
  },
}));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://test.example.com',
  getIDPOrigin: () => 'https://test.example.com',
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  safeFetch: jest.fn(),
  cloneObj: (obj: unknown) => JSON.parse(JSON.stringify(obj)),
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useRefState', () => (initial: unknown) => [
  initial,
  jest.fn(),
  () => initial,
]);
jest.mock('../../hooks/useBookCookies', () => () => null);
jest.mock('../../hooks/useCoverHref', () => () => null);
jest.mock('./AudiobookPlayerProgressBar', () => ({
  getTimeStringFromMS: () => '0:00',
}));
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/Button', () => () => null);
jest.mock('../basic/Icon', () => () => null);
jest.mock('../basic/Input', () => () => null);
jest.mock('./FileImporter', () => () => null);
jest.mock('./BookCoverEditor', () => () => null);

const defaultProps = {
  open: true,
  bookId: undefined,
  setAudiobookId: jest.fn(),
  onClose: jest.fn(),
  handleNewLibrary: jest.fn(),
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie', libraryHash: 'hash123' } },
  books: {},
};

describe('AudiobookDialog Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<AudiobookDialog {...defaultProps} />)).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<AudiobookDialog {...defaultProps} open={false} />),
    ).not.toThrow();
  });

  it('should render with a bookId for existing audiobook', () => {
    expect(() =>
      render(
        <AudiobookDialog
          {...defaultProps}
          bookId="book1"
          books={{
            book1: { title: 'Test Book', audiobookInfo: { spines: [] } },
          }}
        />,
      ),
    ).not.toThrow();
  });
});
