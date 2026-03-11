import { render, screen } from '@testing-library/react-native';
import AppMenu from './AppMenu';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('expo-updates', () => ({ reloadAsync: jest.fn() }));
jest.mock('../../utils/toolbox', () => ({
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  openURL: jest.fn(),
}));
jest.mock('../../utils/analytics', () => ({ logEvent: jest.fn() }));
jest.mock('../../utils/removeEpub', () => ({
  removeAllEPubs: jest.fn(),
  removeAccountEPubs: jest.fn(),
}));
jest.mock('../../hooks/useNetwork', () => () => ({ online: true }));
jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
  historyReplace: jest.fn(),
  historyGoBack: jest.fn(),
  pathname: '/',
}));
jest.mock('../../hooks/useHasNoAuth', () => () => false);
jest.mock('../../hooks/useLoggedInUser', () => () => null);
jest.mock('../basic/BackFunction', () => () => null);
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/Spin', () => () => null);
jest.mock('../basic/Button', () => () => null);

const defaultProps = {
  onImportBooks: jest.fn(),
  onReplaceExisting: jest.fn(),
  onCreateAudiobook: jest.fn(),
  onShowEnvironmentUrls: jest.fn(),
  onOpenAccessCodeDialog: jest.fn(),
  onOpenMetadataDialog: jest.fn(),
  onOpenCopyToolsDialog: jest.fn(),
  onOpenSubscriptionsDialog: jest.fn(),
  isUpdatePending: false,
  isUpdateAvailable: false,
  isDownloading: false,
  accounts: { 'idp1:user1': { cookie: 'test-cookie', libraryHash: 'hash' } },
  idps: { idp1: { name: 'Test IDP', authMethod: 'NONE' } },
  books: {},
  removeFromBookDownloadQueue: jest.fn(),
  setDownloadStatus: jest.fn(),
  clearTocAndSpines: jest.fn(),
  clearUserDataExceptProgress: jest.fn(),
  changeLibraryScope: jest.fn(),
};

describe('AppMenu Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<AppMenu {...defaultProps} />)).not.toThrow();
  });

  it('should render the Library menu item', () => {
    render(<AppMenu {...defaultProps} />);
    expect(screen.getByText('Library')).toBeTruthy();
  });

  it('should render with no accounts', () => {
    expect(() =>
      render(<AppMenu {...defaultProps} accounts={{}} idps={{}} />),
    ).not.toThrow();
  });
});
